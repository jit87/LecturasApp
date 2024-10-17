import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { LibroModel, EstadoLibro } from '../../../models/libro.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  librosNuevos: { id: any; info: any; }[] = []; 
  cargados: boolean = false; 
  disponibles: boolean = true; 
  libro: LibroModel = new LibroModel(); 

  constructor(private _librosService: LibrosService) {
    this.getLibrosNuevos(); 
  }


  getLibrosNuevos() {
    this._librosService.getLibrosNuevos().subscribe(
     (resp: any) => {
        for (let i = 0; i < resp.items.length; i++) {
           const libroInfo = {
                id: resp.items[i].id,
                info: resp.items[i].volumeInfo
              };
          this.librosNuevos.push(libroInfo);
        }
        this.cargados = true;
      },
      (error) => {
        console.log("Ha fallado", error); 
        this.disponibles = false;
        this.cargados = true;
      }
    )
  }

  //Primero se guardan en el LocalStorage para probar y una vez terminado el Front se añadirá al backend
  guardarEstadoLibro(estado: string, libro: any) { 
   if (estado == 'leido') {
        this.libro._id = "";
        this.libro._idUsuario = ""; 
        this.libro.titulo = libro.info.title; 
        this.libro.autores = libro.info.authors[0]; 
        this.libro.editor = libro.info.publisher;
        this.libro.fechaPublicacion = libro.info.publishedDate;
        this.libro.descripcion = libro.info.description;
        this.libro.pageCount = libro.info.pageCount.toString(); 
        this.libro.averageRating = 0;
        this.libro.ratingsCount = 0;
        this.libro.contentVersion = "";
        this.libro.imagen = libro.info.imageLinks.thumbnail; ; 
        this.libro.lengua = "";
        this.libro.previewLink = "";
        this.libro.estado = EstadoLibro.Leido; 
        localStorage.setItem("estado", JSON.stringify(this.libro));
    } else if (estado == 'pendiente') {
        this.libro.estado = EstadoLibro.Pendiente;
        localStorage.setItem('estado', JSON.stringify(this.libro));  
    }
  }


}
