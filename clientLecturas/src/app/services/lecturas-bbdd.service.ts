import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibroModel } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LecturasBBDDService {

  url: string = "http://localhost:4000"; 
  listLibros: LibroModel[] = []; 
  

  constructor(private http: HttpClient) {

  }


   //Obtenemos las libros guardades en mongoDB
  getListLibros(usuarioId: string): Observable<any> {
    return this.http.get(this.url + "/todos/" + usuarioId);
  }


  //Añadimos la libro al vector de libros y luego a la BBDD de mongoDB. 
  addlibro(libro: LibroModel): Observable<any> {
     this.listLibros.push(libro);
     return this.http.post(this.url, libro); 
  }


  //Quitamos la libro del vector de libros 
  deletelibro(libroId: LibroModel): Observable<any> {
    return this.http.delete(this.url + "/" +  libroId); 
  }


  
  getlibroById(_id: string) {
    return this.http.get(this.url + "/" + _id); 
  }


  
  updatelibro(libro: LibroModel, libroId: String | undefined): Observable<any> {
    return this.http.put(this.url + "/" + libroId, libro);
  }






}
