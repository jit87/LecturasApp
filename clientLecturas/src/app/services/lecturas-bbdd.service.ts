import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LibroModel } from '../models/libro.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LecturasBBDDService {

  url: string = "http://localhost:4000"; 
  listLibros: LibroModel[] = []; 
  

  constructor(private http: HttpClient, private _authService: AuthService) {
  }


  //LIBROS
  //Obtenemos las libros guardades en mongoDB
  getListLibros(_idUsuario: string): Observable<any> {
    return this.http.get(this.url + "/libros/todos/" + _idUsuario);
  }


  //Añadimos la libro al vector de libros y luego a la BBDD de mongoDB. 
  addlibro(libro: LibroModel): Observable<any> {
     this.listLibros.push(libro);
     return this.http.post(this.url + '/libros', libro); 
  }


  //Quitamos la libro del vector de libros 
  deletelibro(libroId: string): Observable<any> {
    return this.http.delete(this.url + "/libros/" +  libroId); 
  }

  
  getlibroById(libroId: string) {
    return this.http.get(this.url + "/libros/libro/" + libroId); 
  }


  getlibroByAPIid(APIid: string) {
    return this.http.get(this.url + "/libros/APIid/" + APIid); 
  }

  
  updatelibro(libro: LibroModel, libroId: String | undefined): Observable<any> {
    return this.http.put(this.url + "/libros/" + libroId, libro);
  }



  //COLECCIONES
  addColeccion(coleccion: string) {
    return this.http.post(this.url + '/colecciones', { coleccion }); 
  }

  getListColecciones(_idUsuario: string): Observable<any> {
     return this.http.get(this.url + "/colecciones/todas/" + _idUsuario);
  }

  deleteColeccion(coleccionId: number): Observable<any> {
    return this.http.delete(this.url +  "/colecciones/" +  coleccionId); 
  }


  //ACTIVIDAD GENERAL/SOCIAL
  getListLibrosUsuarios(): Observable<any> {
    return this.http.get(this.url + "/libros/todos/");
  }


  setSeguido(idSeguido: string): Observable<any> {
    return this.http.post(this.url + "/seguidos", { idSeguido }); 
  }

  getSeguidos(): Observable<any> {
      return this.http.get(this.url + "/seguidos/todos"); 
  }
  

  

}
