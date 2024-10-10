import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LibrosService } from '../../../services/libros.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {


  libros: any[] = []; 
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
    this._librosService.getLibros(termino).subscribe(
      (resp: any) => {
        for (let i = 0; i < resp.items.length; i++) {
          this.libros.push(resp.items[i].volumeInfo)
        }
      },
      (error) => {
        console.log("Ha fallado", error); 
      }
    );
    console.log(this.libros); 
  }

  regresar() {
    this.location.back(); 
  }



}
