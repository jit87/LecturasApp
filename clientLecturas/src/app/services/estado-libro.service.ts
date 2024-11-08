import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoLibroService {

  private id: string = "";
  private titulo: string = "";
  private estado: string = "";

  constructor() { }

  //Libro
  getIdLibro(): string {
    return this.id;
  }

  getTituloLibro(): string {
    return this.titulo;
  }

  getEstadoLibro(): string {
    return this.estado;
  }

  setIdLibro(id: string): void {
    this.id = id;
  }

  setTituloLibro(titulo: string): void {
    this.titulo = titulo;
  }

  setEstadoLibro(estado: string): void {
    this.estado = estado;
  }

  
  //Colecciones
  getColecciones() {
      return JSON.parse(localStorage.getItem("coleccionesGuardadas")  || '[]');
  }



}
