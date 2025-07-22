import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeModel } from '../models/mensaje.model';
import { ChatModel } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url: string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  crearChat(chat: ChatModel): Observable<any> {
    return this.http.post(this.url + "/chats", chat);
  }

  crearMensaje(mensaje: MensajeModel): Observable<any> {
    return this.http.post(this.url + "/mensajes", mensaje);
  }

  getChats(_idUsuario: string): Observable<any> {
    return this.http.get(this.url + "/chats/todos/" + _idUsuario);
  }

  getMensajes(_idChat: string): Observable<any> {
    return this.http.get(this.url + "/mensajes/todos/" + _idChat);
  }

}
