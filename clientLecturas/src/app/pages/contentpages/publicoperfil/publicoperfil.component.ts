import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-publicoperfil',
  templateUrl: './publicoperfil.component.html',
  styleUrl: './publicoperfil.component.css'
})
export class PublicoperfilComponent {

  DatosPerfil: {
    nombre: string; 
    usuario: string; 
    imagen: string; 
    biografia: string; 
    librosLeidos: string[]; 
    librosPendientes: string[]; 
    seguidores: string[]; 
    seguidos: string[];
  }[] = [];
  idUsuario: any = ""; 
  seguidos: never[] | undefined;


  constructor(private _authService: AuthService,
              private router: ActivatedRoute,
              private _lecturasBBDDService: LecturasBBDDService,
              private location: Location
  ) {

    this.router.params.subscribe(
      (params:any) => {
        this.idUsuario = params.id; 
        this.cargarDatos(this.idUsuario); 
      }
    )
  }



  cargarDatos(idUsuario: string) {
    this._authService.getUserById(idUsuario).subscribe(
      (resp: any) => {
        this.DatosPerfil = [];  
        this.DatosPerfil.push(resp); 
        console.log(this.DatosPerfil); 
      }, (err) => {
        console.log("Error de obtención de datos", err); 
      })
  }



  regresar() {
    this.location.back(); 
  }

 




}
