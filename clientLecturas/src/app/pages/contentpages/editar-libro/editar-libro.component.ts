import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrl: './editar-libro.component.css'
})
export class EditarLibroComponent {


   //Comunicamos al padre (page) que se haeditado el libro
  @Output() libroEditado = new EventEmitter<boolean>();

  // Evento para notificar el cierre del formulario
  @Output() cerrarFormulario = new EventEmitter<void>();





guardarCambios() { }
  


cerrar() {
  this.cerrarFormulario.emit();
}




}
