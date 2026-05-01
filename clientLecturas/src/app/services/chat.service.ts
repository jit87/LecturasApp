import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MensajeModel } from '../models/mensaje.model';
import { ChatModel } from '../models/chat.model';
import { AbstractChatService } from '../abstracts/AbstractChatService';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends AbstractChatService {

  url: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

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
