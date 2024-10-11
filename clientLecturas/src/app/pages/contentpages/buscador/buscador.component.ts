import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LibrosService } from '../../../services/libros.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {


  libros: { id: any; info: any; }[] = []; 
  cargados: boolean = false; 
  disponibles: boolean = true; 
  // titulo: string;
  // autores: string[];
  // publisher: string;
  // publishedDate: string;
  // descripcion: string;
  // pageCount: number;
  // averageRating: number;
  // ratingsCount: number;
  // contentVersion: string;
  // imagen: string;
  // lengua: string;
  // previewLink: string;
 

  constructor(
    private _librosService: LibrosService,
    private activatedRoute: ActivatedRoute,
    private location: Location) {
    

  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log('Parámetros recibidos:', params);
        this.getLibros(params[('termino')]);
      }
    )
  }

  
  getLibros(termino: string) {
    //Limpiamos la búsqueda anterior antes de realizar nueva búsqueda
    this.libros = []; 
    this._librosService.getLibros(termino).subscribe(
      (resp: any) => {
        for (let i = 0; i < resp.items.length; i++) {
           const libroInfo = {
                id: resp.items[i].id,
                info: resp.items[i].volumeInfo
              };
            this.libros.push(libroInfo);
        }
         this.cargados = true; 
      },
      (error) => {
        console.log("Ha fallado", error); 
        this.disponibles = false;
        this.cargados = true;
      }
    );
    console.log(this.libros); 
  }

  regresar() {
    this.location.back(); 
  }



}
