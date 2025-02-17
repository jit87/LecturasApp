import { Component } from '@angular/core';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent {

  posts: any[] = [];
  seguidos: any[] = []; 
  usuarios: any[] = []; 
  idLogueado: string = ""; 
  emailLogueado: string = ""; 

  constructor(private _lecturasBBDDService: LecturasBBDDService,
              private _authService: AuthService
  ) {
  }

  ngOnInit() {
    this.getActividad(); 
    //Obtenemos el id logueado para ocultar el boton de seguir si coincide consigo mismo
    const email = localStorage.getItem("email");
    this._authService.getIdByEmail(email).subscribe(
      (resp) => {
        console.log(resp); 
        this.idLogueado = resp; 
        if(email)
        this.emailLogueado = email; 
      },
      (err) => {
        console.log(err); 
      }
    ) 
  }


  seguir(id: any, email: any) {
    this._lecturasBBDDService.setSeguido(id, email).subscribe(
      (resp) => {
        console.log("Añadido", resp);
      },
      (err) => {
        console.log(err); 
      }
    )   
  }



  getActividad() {
    this._lecturasBBDDService.getListLibrosUsuarios().subscribe(
      (resp) => {
        console.log(resp); 
        this.posts = resp; 
         for (var i = 0; i <= resp.length; i++){
           this.getDatosPorId(resp[i]._idUsuario); 
         }
      }
    )
  }

  getDatosPorId(id: any) {
    this._authService.getUserById(id).subscribe(
      (resp) => {
        this.usuarios.push(resp); 
      },
      (err) => {
        console.log(err); 
      }
    )
  }

}
