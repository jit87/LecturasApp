import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { AbstractLibrosService } from '../abstracts/AbstractLibrosService';


@Injectable({
  providedIn: 'root'
})
export class LibrosService extends AbstractLibrosService {

  url: string = "https://www.googleapis.com/books/v1/volumes?q="
  Google_API_KEY: string = environment.Google_API_KEY;
  max: number = 10;
  maxRecomendaciones: number = 2;

  id: string = "";
  titulo: string = "";
  estado: string = "";

  constructor(private http: HttpClient) { super(); }

  //Datos de la API
  //Devuelve libros que coincidan con el titulo indicado
  getLibros(term: string): Observable<any> {
    return this.http.get(`${this.url}${term}&key=${this.Google_API_KEY}&maxResults=${this.max}`);
  }

  //Devuelve novedades de libros de ficción
  getLibrosNuevos(): Observable<any> {
    return this.http.get(`${this.url}subject:fiction&key=${this.Google_API_KEY}&maxResults=${this.max}&orderBy=newest`);
  }

  getInfoLibroById(id: string): Observable<any> {
    return this.http.get(`${this.url.slice(0, this.url.length - 3)}/${id}?&key=${this.Google_API_KEY}`);
  }

  //Para las recomendaciones 
  getLibrosByTematica(tematica: string): Observable<any> {
    return this.http.get(`${this.url}subject:${tematica}&key=${this.Google_API_KEY}&maxResults=${this.maxRecomendaciones}&orderBy=newest`);
  }





}
