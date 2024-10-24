import { Component } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { ColeccionModel } from '../../../models/coleccion.model';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  librosGuardados: any[] = [];
  mostrarForm: boolean = false; 
  colecciones: ColeccionModel[] = []; 
  coleccion: ColeccionModel = new ColeccionModel(); 

  constructor(private _librosService: LibrosService) {
    this.mostrarLibros(); 
    this.mostrarColecciones(); 
  }


  //ACCIONES
  /*Libros*/ 
  mostrarLibros() {
    var guardados = localStorage.getItem('librosGuardados');
    if (guardados) {
      this.librosGuardados.push(JSON.parse(guardados));
    }
    console.log(this.librosGuardados); 
  }

  /*Colecciones*/
  mostrarColecciones() {
    var coleccionGuardada = localStorage.getItem("coleccionesGuardadas");
    if(coleccionGuardada)
      this.colecciones = JSON.parse(coleccionGuardada);
  }

  crearColeccion(coleccion: any) {
    this.coleccion = {
      _id: "default", 
      _idUsuario: "default",
      libros: [],
      nombre: coleccion.value
    }
    this.colecciones.push(this.coleccion); 
    localStorage.setItem("coleccionesGuardadas", JSON.stringify(this.colecciones)); 
  }


  //FORMULARIO
  mostrarFormulario(id:string, titulo: string, estado:string) {
    this.mostrarForm = true; 
    this._librosService.setIdLibro(id); 
    this._librosService.setTituloLibro(titulo); 
    this._librosService.setEstadoLibro(estado); 
  }

  cerrarFormulario() {
    this.mostrarForm = false; 
    this.mostrarLibros(); 
  }

  recibirConfEditado(confirmado: boolean) {
   if(confirmado)
    this.mostrarLibros(); 
  }  


}
