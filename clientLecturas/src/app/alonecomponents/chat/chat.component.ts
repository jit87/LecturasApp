import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ChatModel } from '../../models/chat.model';
import { MensajeModel } from '../../models/mensaje.model';
import { AbstractChatService } from '../../abstracts/AbstractChatService';
import { AbstractLecturasBBDDService } from '../../abstracts/AbstractLecturasBBDDService';
import { AbstractAuthService } from '../../abstracts/AbstractAuthService';
import { WebsocketService } from '../../services/websocket.service';



@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  seguidos: any[] = [];
  seguidoSeleccionado: any = "";
  cerrado: boolean = true;
  formulario: FormGroup | any;
  chat: ChatModel;
  mensaje: MensajeModel;
  mensajesGuardados: any[] = [];
  idConMensajesNuevos: string[] = [];
  cargados: boolean = false;
  idChatActual: string = "";

  //Propiedades para cargar más seguidos
  seguidosVisibles: any[] = [];
  tamanioPagina: number = 3;

  //Usuario logueado
  @Input() usuarioID;

  //Acceso al scroll del chat
  @ViewChild('chatScroll') private chatScroll!: ElementRef;


  constructor(
    private _authService: AbstractAuthService,
    private _lecturasBBDDService: AbstractLecturasBBDDService,
    private fb: FormBuilder,
    private _chatService: AbstractChatService,
    private _websocketService: WebsocketService
  ) {
    this.usuarioID = "";
    this.formulario = "";
    this.crearFormulario();
    this.chat = {
      participantes: [],
      ultimoMensaje: "",
      fecha: new Date
    };
    this.mensaje = {
      _idChat: "",
      _idUsuario: "",
      nombre: "",
      texto: "",
      fecha: new Date
    }
  }

  ngOnInit() {
    this.obtenerMensajesDeWebSocket();
    this.getSeguidos();
  }

  cerrarChat() {
    this.cerrado = true;
  }

  getSeguidos() {
    this.seguidos = [];
    this.seguidosVisibles = []
    this._lecturasBBDDService.getSeguidos().subscribe(
      (resp) => {
        resp.forEach((id: any) => {
          this._authService.getUserById(id).subscribe(
            (usuario: any) => {
              if (usuario != undefined) {
                this.seguidos.push(usuario);
                this.actualizarSeguidosVisibles();
                //Buscamos el chat con este contacto: para ordenar por fecha Y para unirnos a su room de WebSocket
                this._chatService.getChats(this.usuarioID).subscribe((chats: any) => {
                  this.ordenarSeguidosPorFecha(chats);   // ya lo tenías: ordena por fecha del chat

                  // NUEVO: nos unimos a la room de este contacto en cuanto sabemos su chat,
                  // así recibimos sus mensajes por WebSocket aunque no lo hayamos abierto todavía
                  const chatConEsteContacto = chats.find((c: any) =>
                    c.participantes.includes(id)
                  );
                  if (chatConEsteContacto) {
                    this._websocketService.joinChat(chatConEsteContacto._id);
                  }
                });
              }
            }
          )
        });
      },
      (err) => {
        console.log(err);
      }
    )
  }

  seleccionarSeguido(seguido: any) {
    this.seguidoSeleccionado = seguido;
    this.cerrado = false;
    this.cargados = false;
    this.idConMensajesNuevos = this.idConMensajesNuevos.filter((elem) => elem != seguido._id);
    this.getChats(this.usuarioID, seguido);
  }

  actualizarSeguidosVisibles() {
    this.seguidosVisibles = this.seguidos.slice(0, this.tamanioPagina);
  }

  verMasSeguidos() {
    this.tamanioPagina += 5;
    this.actualizarSeguidosVisibles();
  }

  get hayMasSeguidos(): boolean {
    return this.seguidosVisibles.length < this.seguidos.length;
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      mensaje: ['']
    })
  }

  guardar(usuarioLogueado: string) {
    this.mensaje = {
      _idChat: this.idChatActual,
      _idUsuario: usuarioLogueado,
      nombre: usuarioLogueado,
      texto: this.formulario.value.mensaje,
      fecha: new Date
    }
    this._chatService.crearMensaje(this.mensaje).subscribe(
      (resp) => {
        console.log(resp); if (this.seguidoSeleccionado) {
          this.subirSeguidoArriba(this.seguidoSeleccionado._id);
        }
      },
      (err) => { console.log(err); }
    );
    this.formulario.reset();
    this.scrollAbajo();
  }

  getChats(_idUsuario: string, seguido: any) {
    var chats: any = [];
    this._chatService.getChats(_idUsuario).subscribe(
      (resp) => {
        chats.push(resp);
        let chatEncontrado = false;

        chats.forEach((chat: any) => {
          chat.forEach((element: any) => {
            element.participantes.forEach((participante: any) => {
              if (participante == seguido._id) {
                chatEncontrado = true;
                this.getMensajes(element._id);
              }
            });
          });
        });
        //Si no existe el chat, lo creamos ahora
        if (!chatEncontrado) {
          const nuevoChat = {
            participantes: [_idUsuario, seguido._id],
            ultimoMensaje: "",
            fecha: new Date
          };
          this._chatService.crearChat(nuevoChat).subscribe(
            (resp) => {
              this.getMensajes(resp._id);
            },
            (err) => console.log(err)
          );
        }
      },
      (error) => console.log(error)
    );
  }

  getMensajes(_idChat: string) {
    this.idChatActual = _idChat;
    this._websocketService.joinChat(_idChat);
    this._chatService.getMensajes(_idChat).subscribe({
      next: (resp) => {
        this.obtenerDatosPorId(resp);
      },
      error: (err) => { console.log(err) }
    });
  }

  obtenerDatosPorId(mensajes: any) {
    this.mensajesGuardados = [...mensajes];
    mensajes.forEach((m: any) => this.rellenarDatosUsuario(m));
    this.cargados = true;
  }

  scrollAbajo(): void {
    try {
      this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  obtenerMensajesDeWebSocket() {
    this._websocketService.getMensajes().subscribe({
      next: (resp: any) => {
        this.mensajesGuardados.push(resp);
        this.rellenarDatosUsuario(resp);
        //Para notificar con punto rojo el mensaje entrante
        this.idConMensajesNuevos.push(resp._idUsuario);
        this.subirSeguidoArriba(resp._idUsuario);
      },
      error: err => console.log(err)
    });
  }

  //Función auxiliar para completar datos en tiempo real
  rellenarDatosUsuario(mensaje: any) {
    this._authService.getUserById(mensaje._idUsuario).subscribe(user => {
      mensaje.nombre = user.nombre;
      mensaje.imagen = user.imagen;
    });
  }

  //Ordenación de contactos del chat
  ordenarSeguidosPorFecha(chats: any[]) {
    this.seguidos.sort((a, b) => {
      //Buscamos el chat de cada uno para comparar su fecha
      const chatA = chats.find((c: any) => c.participantes.includes(a._id));
      const chatB = chats.find((c: any) => c.participantes.includes(b._id));

      const fechaA = chatA?.fecha ? new Date(chatA.fecha).getTime() : 0;
      const fechaB = chatB?.fecha ? new Date(chatB.fecha).getTime() : 0;

      return fechaB - fechaA;
    });
    this.actualizarSeguidosVisibles();
  }

  subirSeguidoArriba(userId: string) {
    const index = this.seguidos.findIndex(s => s._id === userId);
    if (index > -1) {
      const usuario = this.seguidos.splice(index, 1)[0];
      this.seguidos.unshift(usuario);
      this.actualizarSeguidosVisibles();
    }
  }





}
