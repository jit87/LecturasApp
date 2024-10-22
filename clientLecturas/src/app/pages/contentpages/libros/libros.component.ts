import { Component } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  librosGuardados: any[] = [];
  mostrarForm: boolean = false; 

  constructor() {
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
  mostrarFormulario(id:string) {
    this.mostrarForm = true; 
  }

  cerrarFormulario() {
    this.mostrarForm = false; 
  }
  


}
