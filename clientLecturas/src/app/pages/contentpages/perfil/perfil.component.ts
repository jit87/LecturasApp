import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  DatosPerfil: any[] = []; 

  constructor(private _authService: AuthService) {
    const email = localStorage.getItem("email"); 
    this._authService.getUserByEmail(email).subscribe(
      (resp: any) => {
        console.log(resp); 
        this.DatosPerfil.push(resp); 
      }, (err) => {
        console.log("Error de obtención de datos", err); 
      })
  }

}
