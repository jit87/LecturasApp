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
        },
        (error) => {
          console.log("Error", error); 
        }
      )
  }


 



   regresar() {
    this.location.back(); 
  }


}
