import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.put(this.url + "/" + libroId, libro);
  }






}
