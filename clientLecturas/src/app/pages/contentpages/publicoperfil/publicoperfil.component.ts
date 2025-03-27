import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { Location } from '@angular/common';

interface DatosPerfil {
  nombre: string;
  usuario: string;
  imagen: string;
  bio: string;
  librosLeidos: string[];
  librosPendientes: string[];
  seguidores: string[];
  seguidos: string[];
  _id: string; 
}

@Component({
  selector: 'app-publicoperfil',
  templateUrl: './publicoperfil.component.html',
  styleUrl: './publicoperfil.component.css'
})
  
  
export class PublicoperfilComponent {

  idUsuario: any = ""; 
  seguidos: never[] | undefined;
  DatosPerfil: DatosPerfil = {
    nombre: "",
    usuario: "",
    imagen: "",
    bio: "",
    librosLeidos: [],
    librosPendientes: [],
    seguidores: [],
    seguidos: [],
    _id:""
  }; 
  idLogueado: any;
  mostrarBotonAgregar: number = -1; 
  listaSeguidores: any = []; 


  constructor(private _authService: AuthService,
              private router: ActivatedRoute,
              private _lecturasBBDDService: LecturasBBDDService,
              private location: Location
  )
  {
    //Obtenemos el id pasado por la url del navegador
    this.router.params.subscribe(
      (params:any) => {
        this.idUsuario = params.id; 
        this.cargarDatos(this.idUsuario); 
      }
    )
    //Obtenemos el id logueado
    const email = localStorage.getItem("email");
    this._authService.getIdByEmail(email).subscribe(
      (resp) => {
        this.idLogueado = resp;
      },
      (err) => {
        console.log(err); 
      }
    )
    this.compruebaSiEsSeguido(this.idUsuario); 
    this.getLibrosLeidos(this.idUsuario); 
  }
  




  cargarDatos(idUsuario: string) {
    this._authService.getUserById(idUsuario).subscribe(
      (resp: any) => {
            this.DatosPerfil.nombre = resp.nombre;
            this.DatosPerfil.imagen = resp.imagen; 
            this.DatosPerfil.seguidores = resp.seguidores;
            this.DatosPerfil.seguidos = resp.seguidos; 
            this.DatosPerfil._id = resp._id; 
            this.DatosPerfil.bio = resp.bio; 
      }, (err) => {
        console.log("Error de obtención de datos", err); 
    })
    this.getSeguidoresById(this.idUsuario);
  }



  regresar() {
    this.location.back(); 
  }


  
 //Si es seguido el id se oculta el botón de seguir en la vista
 compruebaSiEsSeguido(idUsuario: string) { 
    this._lecturasBBDDService.getSeguidos().subscribe(
      (resp) => {
        let result = resp.includes(idUsuario); 
        if (!result && idUsuario !== this.idLogueado) {
          this.mostrarBotonAgregar = 1;
        } 
      },
      (err) => {
        console.log(err); 
      }
    )
  }


  seguir(idSeguido: any) {
    this._lecturasBBDDService.setSeguido(idSeguido).subscribe(
      (resp) => {
        console.log("Añadido", resp);
        this.cargarDatos(this.idUsuario);
      },
      (err) => {
        console.log(err); 
      }
    )   
     this.mostrarBotonAgregar = -1;
  }


  noseguir(idSeguido: any) {
    this._lecturasBBDDService.deleteSeguido(idSeguido).subscribe(
      (resp) => {
        console.log("Has dejado de seguir al usuario" + idSeguido, resp); 
        this.cargarDatos(this.idUsuario);
      },
      (err) => {
        console.log(err); 
      }
    )
     this.mostrarBotonAgregar = 1;
  }


          
  getSeguidoresById(id:any) {
    this.listaSeguidores = []; 
    this._lecturasBBDDService.getSeguidoresById(id).subscribe(
      (resp) => {
        console.log("Resuesta:",resp); 
       resp.forEach((id:any) => {
            this._authService.getUserById(id).subscribe(
              (usuario: any) => {
                console.log("Usuario:",usuario); 
                if (usuario != undefined) {
                  this.listaSeguidores.push(usuario);
                  console.log("Seguidores:",this.listaSeguidores); 
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



  getLibrosLeidos(id:string) {
    this._lecturasBBDDService.getLibrosLeidos(id).subscribe(
      (resp) => {
        console.log(resp); 
      },
      (err) => {
        console.log(err); 
      }
   )
 }
        
        
    



}
