import { Component } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  librosGuardados: any[] = [];

  constructor() {
    this.mostrarLibros(); 
  }


  mostrarLibros() {
    var guardados = localStorage.getItem('librosGuardados');

    if (guardados) {
      this.librosGuardados.push(JSON.parse(guardados));
    }
    console.log(this.librosGuardados); 
  }
  


}
