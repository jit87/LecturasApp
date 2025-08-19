import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: any;
  private url: string = 'http://localhost:4000';

  constructor() {
    //Obtiene el token JWT y el ID del usuario
    const token = localStorage.getItem('auth-token');
    const email = localStorage.getItem('email');


    //Conecta con el WebSocket e incluir el token y el ID del usuario
    this.socket = io(this.url, {
      transports: ['websocket'],
      auth: {
        token: token,
        email: email
      }
    });

    //Manejamos la conexión exitosa
    this.socket.on('connect', () => {
      console.log('Conectado al WebSocket');
    });
  }


  getMensajes() {
    return new Observable((observer) => {
      this.socket.on('nuevoMensaje', (data: any) => {
        observer.next(data);
      });
    });
  }



}
