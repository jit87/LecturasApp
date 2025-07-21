import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LecturasBBDDService } from '../../services/lecturas-bbdd.service';
import { ChatModel } from '../../models/chat.model';
import { MensajeModel } from '../../models/mensaje.model';
import { ChatService } from '../../services/chat.service';

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

  //Usuario logueado
  @Input() usuarioID;

  constructor(
    private _authService: AuthService,
    private _lecturasBBDDService: LecturasBBDDService,
    private fb: FormBuilder,
    private _chatService: ChatService
  ) {
    this.getSeguidos();
    this.usuarioID = "";
    this.formulario = "";
    this.crearFormulario();
    this.cargarDatosAlFormulario();
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
    console.log(this.chat);
  }


  crearFormulario() {
    this.formulario = this.fb.group({
      mensaje: ['']
    })
  }

  cargarDatosAlFormulario() {
    this.formulario.setValue({
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





}
