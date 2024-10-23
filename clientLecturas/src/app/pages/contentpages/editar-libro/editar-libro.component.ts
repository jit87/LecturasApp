import { Component, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { NgForm } from '@angular/forms';
import { LibroModel } from '../../../models/libro.model';

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

id: string; 
titulo: string; 
estado: string; 
libro: LibroModel = new LibroModel();   

constructor(private _librosService: LibrosService) {
  this.id = this._librosService.getIdLibro(); 
  this.titulo = this._librosService.getTituloLibro(); 
  this.estado = this._librosService.getEstadoLibro(); 
  console.log(this.id); 
  console.log(this.titulo); 
}


guardarCambios(form: NgForm) { 
  
  if (form.invalid) {
    console.log("Formulario no valido");
    return;
  }

  //Llamar servicio para actualizar libro
  
}
  


cerrar() {
  this.cerrarFormulario.emit();
}
  





}
