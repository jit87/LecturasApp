import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: any;
  private url: string = environment.apiUrl;

  constructor() {

    //Obtiene el token JWT y el ID del usuario
    const token = localStorage.getItem('auth-token');


    //Conecta con el WebSocket e incluye el token y el ID del usuario
    this.socket = io(this.url, {
      transports: ['websocket'],
      auth: { token: token }
    });

    //Manejamos la conexión exitosa
    this.socket.on('connect', () => {
      console.log('Conectado al WebSocket');
    });
    this.socket.on('connect_error', (err: any) => console.error('Error WebSocket:', err.message));
  }

  joinChat(idChat: string) {
    this.socket.emit('joinChat', idChat);
  }


  getMensajes() {
    return new Observable((observer) => {
      this.socket.on('nuevoMensaje', (data: any) => {
        observer.next(data);
      });
    });
  }



}
