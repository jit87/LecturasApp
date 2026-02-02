import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../environments/environment'
import { AbstractLibrosService } from '../abstracts/AbstractLibrosService';


@Injectable({
  providedIn: 'root'
})
export class LibrosService extends AbstractLibrosService {

  url: string = "https://www.googleapis.com/books/v1/volumes?q="
  Google_API_KEY: string = environment.Google_API_KEY;
  max: number = 9;
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

  //Devuelve novedades de libros 
  getLibrosNuevos(): Observable<any> {
    return this.http.get(`${this.url}subject:fiction&printType=books&orderBy=newest&maxResults=${this.max}&key=${this.Google_API_KEY}`).pipe(
      map((res: any) => {
        //Si hay libros devolvemos un vector de libros con el tamaño determinado por max o los que haya devuelto la API
        const items = res.items?.slice(0, this.max) || [];
        //Sustituimos items por el vector de libros limitado por max 
        return { ...res, items };
      })
    );
  }

  getInfoLibroById(id: string): Observable<any> {
    return this.http.get(`${this.url.slice(0, this.url.length - 3)}/${id}?&key=${this.Google_API_KEY}`);
  }

  //Para las recomendaciones 
  getLibrosByTematica(tematica: string): Observable<any> {
    return this.http.get(`${this.url}subject:${tematica}&key=${this.Google_API_KEY}&maxResults=${this.maxRecomendaciones}&orderBy=newest`);
  }





}
