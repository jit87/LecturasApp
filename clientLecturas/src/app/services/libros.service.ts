import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  url: string = "https://www.googleapis.com/books/v1/volumes?q="
  Google_API_KEY: string = environment.Google_API_KEY;  
  max: number = 10; 

  id: string = ""; 
  titulo: string = "";
  estado: string = ""; 

  constructor(private http: HttpClient) { }

  //Devuelve libros que coincidan con el titulo indicado
  getLibros(term: string): Observable<any> {
    return this.http.get(`${this.url}${term}&key=${this.Google_API_KEY}&maxResults=${this.max}`); 
  }

  //Devuelve novedades de libros de ficción
  getLibrosNuevos(): Observable<any> {
    return this.http.get(`${this.url}subject:fiction&key=${this.Google_API_KEY}&maxResults=${this.max}&orderBy=newest`); 
  }

  getInfoLibroById(id: string): Observable<any>{
    return this.http.get(`${this.url.slice(0,this.url.length-3)}/${id}?&key=${this.Google_API_KEY}`);
  }


  
  ///////////////////////

  getIdLibro() {
    return this.id; 
  }

  getTituloLibro() {
    return this.titulo; 
  }

  getEstadoLibro() {
    return this.estado; 
  }

  setIdLibro(id:string) {
    this.id = id; 
  }

  setTituloLibro(titulo: string) {
    this.titulo = titulo; 
  }

  setEstadoLibro(estado: string) {
    this.estado = estado; 
  }

  





}
