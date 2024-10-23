import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { EstadoLibro } from '../../../models/libro.model';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  librosGuardados: any[] = [];
  mostrarForm: boolean = false;  

  constructor(private _librosService: LibrosService) {
    this.mostrarLibros(); 
  }


  //ACCIONES
  mostrarLibros() {
    var guardados = localStorage.getItem('librosGuardados');

    if (guardados) {
      this.librosGuardados.push(JSON.parse(guardados));
    }
    console.log(this.librosGuardados); 
  }


  //FORMULARIO
  mostrarFormulario(id:string, titulo: string, estado: EstadoLibro) {
    this.mostrarForm = true; 
    this._librosService.setIdLibro(id); 
    this._librosService.setTituloLibro(titulo); 
    this._librosService.setEstadoLibro(estado); 
    
  }

  cerrarFormulario() {
    this.mostrarForm = false; 
  }
  


}
