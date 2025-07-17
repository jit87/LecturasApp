import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LecturasBBDDService } from '../../services/lecturas-bbdd.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  seguidos: any[] = []; 
  seguidoSeleccionado: any = ""; 
  cerrado: boolean = true; 

  constructor( private _authService: AuthService,
               private _lecturasBBDDService: LecturasBBDDService){
    this.getSeguidos(); 
  }



  cerrarChat() {
    this.cerrado = true; 
  }


  getSeguidos() {
    this.seguidos = []; 
    this._lecturasBBDDService.getSeguidos().subscribe(
      (resp) => {
        resp.forEach((id:any) => {
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


  seleccionarSeguido(seguido:any) {
    this.seguidoSeleccionado = seguido; 
    this.cerrado = false; 
  }



}
