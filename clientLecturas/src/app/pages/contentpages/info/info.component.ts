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


constructor(
    private _librosService: LibrosService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _lecturasBBDDService: LecturasBBDDService,
) {
   this.activatedRoute.params.subscribe(
     (params: any) => {
       this.libro.APIid = params.id; 
       this.getInfoLibro(params.id); 
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
            this.cargado = true; 
          },
        (error) => {
            console.log("Error", error); 
            this.disponibles2 = false;
            this.cargado = false;
          }
      )
    }


  regresar() {
    this.location.back(); 
  }

  

}
