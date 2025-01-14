import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { ActivatedRoute } from '@angular/router';
import { EstadoLibroService } from '../../services/estado-libro.service';
import { LecturasBBDDService } from '../../services/lecturas-bbdd.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LibroModel } from '../../models/libro.model';

@Component({
  selector: 'app-estado-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estado-libro.component.html',
  styleUrl: './estado-libro.component.css'
})
export class EstadoLibroComponent {

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

@Input() libro!: any; 

  constructor(
    private _lecturasBBDDService: LecturasBBDDService,
    private _authService: AuthService,
    private toastr: ToastrService,
    private _estadoLibroService: EstadoLibroService) {
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
        return this.usuarioID;
      },
      (err) => {
        console.error('Error al obtener el usuarioID:', err);
        reject(err);
      }
    );
  });
}
  



//Primero se guardan en el LocalStorage para probar y una vez terminado el Front se añadirá al backend
async guardarEstadoLibro(estado: string) { 
  console.log("Datos del libro recibidos:", this.libro); 
  //Await espera a que se ejecute la promesa anterior
  const usuarioID = await this.getUsuarioID();

  //Recuperamos lo que haya en BBDD
  /////////Pendiente/////////// 

  var nuevoLibro = new LibroModel();
  nuevoLibro = {
      _id: this.libro.id,
      _idUsuario: usuarioID,
      titulo: this.libro.titulo || this.libro.info.title || "Sin título",
      autores: this.libro.autores || this.libro.info.authors[0],
      editor: this.libro.editor || this.libro.info.publisher,
      fechaPublicacion: this.libro.fechaPublicacion || this.libro.info.publisherDate,
      descripcion: this.libro.descripcion || this.libro.info.description,
      pageCount: this.libro.pageCount || this.libro.info.pageCount.toString(),
      averageRating: 0,
      ratingsCount: 0,
      contentVersion: "",
      imagen: this.libro.imagen || this.libro.info.imageLinks.thumbnail,
      lengua: "",
      previewLink: "",
      estado: estado === 'Leído' ? 'Leído' : 'Pendiente',
      categorias: this.libro.categorias || this.libro.info.categories.join(', ') || "Sin categoría",
      APIid: this.libro.APIid || this.libro.id
    };
  
    this.toastr.success('Ha sido añadido!', 'Añadido!');
    this._lecturasBBDDService.addlibro(nuevoLibro).subscribe((resp: any) => {
      console.log("Libro añadido", resp);
    })
  }
  



}
