import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EstadoLibroService } from '../../../services/estado-libro.service';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { AuthService } from '../../../services/auth.service';
import { LibroModel } from '../../../models/libro.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

libroId: any = ""; 
libroInfo: any[] = []; 
titulo: string = "";
portada: string = "";
descripcion: string = ""; 
autores: string[] = [];
editor: string = ""; 
categorias: string = ""; 
paginas: any = ""; 
fecha: string = ""; 
  
cargando: boolean = false; 
disponibles1: boolean = true; 
disponibles2: boolean = true; 
librosGuardados: any[] = [];
usuarioID: string = ""  
  
libro =  new LibroModel;


constructor(
    private _librosService: LibrosService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _lecturasBBDDService: LecturasBBDDService,
) {
   this.activatedRoute.params.subscribe(
     (params:any) => {
        this.libroId = params.id;
        this.getInfoLibro(this.libroId); 
      }
    )
  }


  async getInfoLibro(id: string) {
    this.cargando = true; 
    this._lecturasBBDDService.getlibroById(this.libroId).subscribe(
       (resp: any) => {
         this.libro.titulo = resp.titulo; 
         this.libro.imagen = resp.imagen; 
         this.libro.descripcion = resp.descripcion.replace(/(<([^>]+)>)/ig,""); 
         this.libro.autores = resp.autores[0]; 
         this.libro.editor = resp.editor; 
         this.libro.categorias = resp.categorias || resp.coleccion; 
         this.libro.pageCount = resp.pageCount; 
         this.libro.fechaPublicacion = resp.fechaPublicacion; 
         this.libro.APIid = resp.id; 
         this.cargando = false; 
      },
      (error) => {
        console.log("error InfoLibro1",error); 
        this.disponibles1 = false;
        this.cargando = false;
      }
    )
    this._librosService.getInfoLibroById(id).subscribe(
      (resp) => {
        console.log(resp); 
          this.libro.titulo = resp.volumeInfo.title; 
          this.libro.imagen = resp.volumeInfo.imageLinks.thumbnail; 
          this.libro.descripcion = resp.volumeInfo.description.replace(/(<([^>]+)>)/ig,""); 
          this.libro.autores = resp.volumeInfo.authors; 
          this.libro.editor = resp.volumeInfo.publisher; 
          this.libro.categorias = resp.volumeInfo.categories.toString(); 
          this.libro.pageCount= resp.volumeInfo.pageCount.toString(); 
          this.libro.fechaPublicacion = resp.volumeInfo.publishedDate; 
          this.libro.APIid = resp.id; 
          this.cargando = false;
        },
      (error) => {
          console.log("Error", error); 
          this.disponibles2 = false;
          this.cargando = false;
         }
     )
  }


   regresar() {
    this.location.back(); 
  }

  

}
