import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { ActivatedRoute } from '@angular/router';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { LibroModel } from '../../../models/libro.model';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

libroInfo: any[] = []; 
titulo: string = "";
portada: string = "";
descripcion: string = ""; 
autores: string[] = [];
editor: string = ""; 
categorias: string = ""; 
paginas: any = ""; 
fecha: string = ""; 
  
cargado: boolean = false; 
disponibles1: boolean = true; 
disponibles2: boolean = true; 
librosGuardados: any[] = [];
usuarioID: string = ""  
  
libro: LibroModel = new LibroModel(); 
  
usuario: string = ""; 
imagen: string = ""; 


constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _lecturasBBDDService: LecturasBBDDService,
    private _authService: AuthService
) {
   this.activatedRoute.params.subscribe(
     (params: any) => {
       this.libro._id = params.id; 
       this.getInfoLibro(params.id);
       this.getUsuario(params.idUsuario); 
     },
      (error) => {
        console.log("Error info.component.ts en obetener id", error); 
        this.disponibles1 = false;
        this.cargado = false;
      }
    )
  }

 


  //Obtiene la info del servicio de API
  getInfoLibro(id: string) {
    this._lecturasBBDDService.getlibroById(id).subscribe(
      (resp: any) => {
        console.log(resp); 
        this.libro.titulo = resp.titulo;
        this.libro.imagen = resp.imagen;
        this.libro.autores = resp.autores;
        this.libro.editor = resp.editor;
        this.libro.categorias = resp.categorias.toString();
        /*this.libro.pageCount= resp.pageCount.toString(); */
        this.libro._idUsuario = resp.idUsuario;
        this.libro.resena = resp.resena;
        this.cargado = true; 

        this.usuarioID = resp.idUsuario;
      },
      (error) => {
        console.log("Error", error);
        this.disponibles2 = false;
        this.cargado = false;
      }
    )
  }

  

  getUsuario(idUsuario: string) {
    this._authService.getUserById(idUsuario).subscribe(
      (resp) => {
        console.log(resp); 
        this.usuario = resp.nombre;
        this.imagen = resp.imagen; 
      }
    )
  }
  


  regresar() {
    this.location.back(); 
  }



}
