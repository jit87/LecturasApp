import { Component, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { NgForm } from '@angular/forms';
import { LibroModel } from '../../../models/libro.model';
import { ColeccionModel } from '../../../models/coleccion.model';
import { EstadoLibroService } from '../../../services/estado-libro.service';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrl: './editar-libro.component.css'
})
export class EditarLibroComponent {


//Comunicamos al padre (libros) que se ha editado el libro
@Output() libroEditado = new EventEmitter<boolean>();

//Evento para notificar al padre (libros) el cierre del formulario
@Output() cerrarFormulario = new EventEmitter<void>();
  

libro: LibroModel = new LibroModel();   
colecciones: any[] = []; 


constructor(private _estadoLibroService: EstadoLibroService) {
  this.libro._id = this._estadoLibroService.getIdLibro(); 
  this.libro.titulo = this._estadoLibroService.getTituloLibro();
  this.libro.estado = this._estadoLibroService.getEstadoLibro(); 
  var datos = this._estadoLibroService.getColecciones(); 
  if (datos) {
    //this.colecciones = [datos]; 
    datos.forEach((element:any) => {
      this.colecciones.push(element.nombre); 
    });
    this.colecciones.push("No asignar"); 
  }
}


guardarCambios(form: NgForm) {  
  if (form.invalid) {
    console.log("Formulario no valido");
    return;
  }
  //Obtenemos del LS los libros almacenados
  let libros = JSON.parse(localStorage.getItem('librosGuardados') || '[]');
  //Buscamos la posición del libro a modificar
  let libroIndex = 0;
  for (var i = 0; i <= libros.length; i++) {
    if (libros[i]._id == this.libro._id) {
        libroIndex = i;
        break; 
    }
  }
  //Actualizamos el libro y lo notificamos al padre
  if (libroIndex !== -1) {
    libros[libroIndex].estado = this.libro.estado;
    libros[libroIndex].coleccion = this.libro.coleccion;
    localStorage.setItem('librosGuardados', JSON.stringify(libros));
    this.libroEditado.emit(true); 
  }
}
  


cerrar() {
  this.cerrarFormulario.emit();
}
  





}
