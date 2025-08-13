import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ChatModel } from '../../models/chat.model';
import { MensajeModel } from '../../models/mensaje.model';
import { AbstractChatService } from '../../abstracts/AbstractChatService';
import { AbstractLecturasBBDDService } from '../../abstracts/AbstractLecturasBBDDService';
import { AbstractAuthService } from '../../abstracts/AbstractAuthService';


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

  //Usuario logueado
  @Input() usuarioID;

  constructor(
    private _authService: AbstractAuthService,
    private _lecturasBBDDService: AbstractLecturasBBDDService,
    private fb: FormBuilder,
    private _chatService: AbstractChatService
  ) {
    this.getSeguidos();
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




  cerrarChat() {
    this.cerrado = true;
  }


  getSeguidos() {
    this.seguidos = [];
    this._lecturasBBDDService.getSeguidos().subscribe(
      (resp) => {
        resp.forEach((id: any) => {
          this._authService.getUserById(id).subscribe(
            (usuario: any) => {
              if (usuario != undefined) {
                this.seguidos.push(usuario);
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
    this.getChats(this.usuarioID, seguido);
  }


  crearFormulario() {
    this.formulario = this.fb.group({
      mensaje: ['']
    })
  }


  guardar(usuarioLogueado: string, seguido: any) {
    console.log(this.formulario);
    this.chat = {
      participantes: [usuarioLogueado, seguido._id],
      ultimoMensaje: "",
      fecha: new Date
    }
    this._chatService.crearChat(this.chat).subscribe(
      (resp) => {
        console.log("Respuesta chat:", resp);
        this.mensaje = {
          _idChat: resp._id,
          _idUsuario: usuarioLogueado,
          nombre: usuarioLogueado,
          texto: this.formulario.value.mensaje,
          fecha: new Date
        }
        this._chatService.crearMensaje(this.mensaje).subscribe(
          (resp) => {
            console.log(resp);
          },
          (err) => {
            console.log(err);
          }
        )
      },
      (err) => {
        console.log(err);
      }
    )
  }


  getChats(_idUsuario: string, seguido: any) {
    var chats: any = [];
    var participantes: any = [];
    this._chatService.getChats(_idUsuario).subscribe(
      (resp) => {
        chats.push(resp);
        chats.forEach((chat: any) => {
          chat.forEach((element: any) => {
            participantes.push(element.participantes);
            element.participantes.forEach((participante: any) => {
              if (participante == seguido._id) {
                this.getMensajes(element._id);
              }
            });
          })
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }


  getMensajes(_idChat: string) {
    this._chatService.getMensajes(_idChat).subscribe({
      next: (resp) => {
        this.mensajesGuardados = resp;
      },
      error: (error) => { console.log(error) }
    })
  }





}
