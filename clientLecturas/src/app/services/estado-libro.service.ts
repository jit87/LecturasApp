import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoLibroService {

  private id: string = "";
  private titulo: string = "";
  private estado: string = "";
  private coleccion: string = ""; 

  constructor() { }

  //GETTERS
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

  getLibros() {
     return JSON.parse(localStorage.getItem("librosGuardados")  || '[]');
  }


  //Colecciones
  getColeccionLibro() {
    return this.coleccion; 
  }

  //Cambiar por Id cuando conectemos con el backend
  getColeccionByName(nombre: string) {
    var coleccion = "";
    var libros = JSON.parse(localStorage.getItem("librosGuardados") || '[]');
    libros.forEach((elem:any) => {
      if (elem.titulo == nombre) {
        coleccion = elem.coleccion; 
      }
    });
    return coleccion; 
  }

  getColecciones() {
      return JSON.parse(localStorage.getItem("coleccionesGuardadas")  || '[]');
  }


  //SETTERS
  //Libro
  setIdLibro(id: string): void {
    this.id = id;
  }

  setTituloLibro(titulo: string): void {
    this.titulo = titulo;
  }

  setEstadoLibro(estado: string): void {
    this.estado = estado;
  }

  setColeccionLibro(coleccion: string) {
    this.coleccion = coleccion;
  }

  






}
