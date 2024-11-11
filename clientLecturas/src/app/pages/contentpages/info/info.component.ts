import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
autores: string = "";
editor: string = ""; 
categorias: string = ""; 
paginas: string = ""; 
fecha: string = ""; 
  
cargando: boolean = false; 
disponibles: boolean = true; 
librosGuardados: any[] = [];

constructor(
    private _librosService: LibrosService,
    private activatedRoute: ActivatedRoute,
    private location: Location) {
   this.activatedRoute.params.subscribe(
     (params:any) => {
        this.libroId = params.id;
        this.getInfoLibro(this.libroId); 
      }
    )
  
  }



  getInfoLibro(id: string) {
    this.cargando = true; 
    this._librosService.getInfoLibroById(id).subscribe(
      (resp) => {
          console.log(resp); 
          this.titulo = resp.volumeInfo.title; 
          this.portada = resp.volumeInfo.imageLinks.thumbnail; 
          this.descripcion = resp.volumeInfo.description.replace(/(<([^>]+)>)/ig,""); 
          this.autores = resp.volumeInfo.authors; 
          this.editor = resp.volumeInfo.publisher; 
          this.categorias = resp.volumeInfo.categories; 
          this.paginas = resp.volumeInfo.pageCount.toString(); 
          this.fecha = resp.volumeInfo.publishedDate; 
          this.cargando = false;
        },
        (error) => {
          console.log("Error", error); 
          this.disponibles = false;
          this.cargando = false;
        }
      )
  }


   regresar() {
    this.location.back(); 
  }


  //Primero se guardan en el LocalStorage para probar y una vez terminado el Front se añadirá al backend
  guardarEstadoLibro(estado: string, libro: any) { 
    
    //Recuperamos lo que haya en el localStorage
    const librosPrevios = JSON.parse(localStorage.getItem("librosGuardados") || '[]');

    //Hay que crear una instancia para cada libro, si no se añade el mismo varias veces
    const nuevoLibro = {
      _id: libro.id,
      _idUsuario: "",
      titulo: libro.info.title,
      autores: libro.info.authors[0],
      editor: libro.info.publisher,
      fechaPublicacion: libro.info.publishedDate,
      descripcion: libro.info.description,
      pageCount: libro.info.pageCount.toString(),
      averageRating: 0,
      ratingsCount: 0,
      contentVersion: "",
      imagen: libro.info.imageLinks.thumbnail,
      lengua: "",
      previewLink: "",
      estado: estado === 'Leído' ? 'Leído' : 'Pendiente'
    };

    if (nuevoLibro) {
        this.librosGuardados = librosPrevios; 
        this.librosGuardados.push(nuevoLibro);
        console.log(this.librosGuardados);
        localStorage.setItem("librosGuardados", JSON.stringify(this.librosGuardados));
      } 

  }



}
