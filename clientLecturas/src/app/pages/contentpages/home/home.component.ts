import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { LibroModel } from '../../../models/libro.model';
import { EstadoLibroService } from '../../../services/estado-libro.service';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';


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
  librosGuardados: any[] = []; 
  idUsuario: String = ""; 


  constructor(private _librosService: LibrosService,
              private _estadoLibroService: EstadoLibroService,
              private _lecturasBBDDService: LecturasBBDDService) {
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
        this._lecturasBBDDService.addlibro(nuevoLibro).subscribe((resp: any) => {
          console.log(resp);
        })
      
      } 
  }


getEstadoLibro(id: string) {
  var result = 0;   
  var librosGuardados = this._estadoLibroService.getLibros();
  for (const element of librosGuardados) {
    if (element._id === id) {
      result = 1; 
      break; 
    } 
  }
  return result; 
}




}
