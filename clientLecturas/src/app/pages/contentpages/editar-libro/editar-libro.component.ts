import { Component, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { NgForm } from '@angular/forms';
import { LibroModel } from '../../../models/libro.model';
import { ColeccionModel } from '../../../models/coleccion.model';
import { EstadoLibroService } from '../../../services/estado-libro.service';
import { LecturasBBDDService } from '../../../services/lecturas-bbdd.service';

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


constructor(private _estadoLibroService: EstadoLibroService, private _lecturasBBDDService: LecturasBBDDService ) {
  this.libro._id = this._estadoLibroService.getIdLibro(); 
  this.libro.titulo = this._estadoLibroService.getTituloLibro();
  this.libro.estado = this._estadoLibroService.getEstadoLibro(); 
  var datos = this._estadoLibroService.getColecciones(); 
  if (datos) {
    datos.forEach((element:any) => {
      this.colecciones.push(element.nombre); 
    });
    this.colecciones.push("No asignado"); 
  }
}

//Cambiar el acceso del lS a la BBDD cuando se cree el backend
guardarCambios(form: NgForm) {  
  if (form.invalid) {
    console.log("Formulario no valido");
    return;
  }
  this._lecturasBBDDService.updatelibro(this.libro, this.libro._id).subscribe(
    (resp) => {
      console.log("Libro actualizado", resp);
    },
    (error) => {
      console.log(error); 
    }
  )

  
  //Actualizamos el libro y lo notificamos al padre
  this.libroEditado.emit(true); 
  
}
  


cerrar() {
  this.cerrarFormulario.emit();
}
  





}
