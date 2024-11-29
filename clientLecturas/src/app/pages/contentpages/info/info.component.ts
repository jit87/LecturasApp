import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EstadoLibroService } from '../../../services/estado-libro.service';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';
import { AuthService } from '../../../services/auth.service';

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
disponibles: boolean = true; 
librosGuardados: any[] = [];
usuarioID: String = ""

constructor(
    private _librosService: LibrosService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _estadoLibroService: EstadoLibroService,
    private _lecturasBBDDService: LecturasBBDDService,
    private _authService: AuthService) {
   this.activatedRoute.params.subscribe(
     (params:any) => {
        this.libroId = params.id;
        this.getInfoLibro(this.libroId); 
      }
    )
  }

//Usamos promesa porque la obtención del ID es asíncrona y si la queremos recuperar en guardarEstadoLibros dará undefined si no usamos promesas
 async getUsuarioID() {
  const email = localStorage.getItem("email"); 
   return new Promise((resolve, reject) => {
     this._authService.getIdByEmail(email).subscribe(
       (resp: any) => {
         this.usuarioID = resp;
         console.log('Usuario ID obtenido:', this.usuarioID);
         resolve(this.usuarioID);
       },
       (err) => {
         console.error('Error al obtener el usuarioID:', err);
         reject(err);
       }
     );
   });
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
  async guardarEstadoLibro(estado: string) { 
    //Await espera a que se ejecute la promesa anterior
    const usuarioID = await this.getUsuarioID();
    //Recuperamos lo que haya en el localStorage
    const librosPrevios = JSON.parse(localStorage.getItem("librosGuardados") || '[]');
    //Hay que crear una instancia para cada libro, si no se añade el mismo varias veces
    const nuevoLibro = {
      _id: this.libroId,
      _idUsuario: usuarioID,
      titulo: this.titulo,
      autores: this.autores,
      editor: this.editor,
      fechaPublicacion: this.fecha,
      descripcion: this.descripcion,
      pageCount:this.paginas,
      averageRating: 0,
      ratingsCount: 0,
      contentVersion: "",
      imagen: this.portada,
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
