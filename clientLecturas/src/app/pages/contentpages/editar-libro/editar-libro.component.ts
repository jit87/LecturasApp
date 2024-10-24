import { Component, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { NgForm } from '@angular/forms';
import { LibroModel } from '../../../models/libro.model';
import { ColeccionModel } from '../../../models/coleccion.model';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrl: './editar-libro.component.css'
})
export class EditarLibroComponent {


//Comunicamos al padre (page) que se haeditado el libro
@Output() libroEditado = new EventEmitter<boolean>();

//Evento para notificar al padre (page) el cierre del formulario
@Output() cerrarFormulario = new EventEmitter<void>();

libro: LibroModel = new LibroModel();   
colecciones: ColeccionModel[] = []; 


constructor(private _librosService: LibrosService) {
 
  this.libro._id = this._librosService.getIdLibro(); 
  this.libro.titulo = this._librosService.getTituloLibro();
  this.libro.estado = this._librosService.getEstadoLibro(); 

 
  console.log(this.libro._id); 
  console.log(this.libro.titulo);
  console.log(this.libro.estado); 
}


guardarCambios(form: NgForm) { 
  
  if (form.invalid) {
    console.log("Formulario no valido");
    return;
  }

  let libros = JSON.parse(localStorage.getItem('libros') || '[]');

  //Buscamos la posición del libro a modificar
  let libroIndex = libros.findIndex((libro: any) => libro._id === this.libro._id);

  console.log(this.libro._id);
  console.log(libroIndex);

  //Actualiza el libro
  if (libroIndex !== -1) {
    libros[libroIndex].estado = this.libro.estado;
    libros[libroIndex].coleccion = this.libro.coleccion;
    localStorage.setItem('librosGuardados', JSON.stringify(libros));
  }
}
  


cerrar() {
  this.cerrarFormulario.emit();
}
  





}
