import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from '../../../services/libros.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {


  libros: { id: any; info: any; }[] = []; 
  librosGuardados: any[] = [];
  cargando: boolean = false; 
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
    this.cargando = true; 
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
            this.cargando = false;
        }
      },
      (error) => {
        console.log("Ha fallado", error); 
        this.disponibles = false;
      }
    );
    console.log(this.libros); 
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
