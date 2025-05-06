import { Injectable } from '@angular/core';
import { LecturasBBDDService } from './lecturas-bbdd.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoLibroService {

  private id: string = "";
  private titulo: string = "";
  private estado: string = "";
  private coleccion: string = ""; 
  private resena: string = ""; 
  resp: any; 

  constructor(
    private _lecturasBBDDService: LecturasBBDDService,
  ) {
      

   }

  //GETTERS
  getIdLibro(): string {
    return this.id;
  }

  getTituloLibro(): string {
    return this.titulo;
  }

  getEstadoLibro(): string {
    return this.estado;
  }

  getResenaLibro(): string{
    return this.resena; 
  }

  getLibros(usuarioId: string) {
    this._lecturasBBDDService.getListLibros(usuarioId).subscribe(
      (resp) => {
        console.log(resp); 
        this.resp = resp; 
      },
      (err) => {
        console.log(err); 
      }
    ); 
     return this.resp; 
  }


  estaGuardado(APIid: string) {
    var result = false; 
    this._lecturasBBDDService.getlibroByAPIid(APIid).subscribe(
      (resp) => {
        console.log("Está guardado", resp); 
        result = true; 
      },
      (err) => {
        console.log("No se ha encontrado", err); 
        result = false; 
      }
    ) 
    return result; 
  }


  getColeccionById() {
    return  this.coleccion; 
  }

  

  //SETTERS
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

  setResenaLibro(resena: string) {
    this.resena = resena; 
  }
  






}
