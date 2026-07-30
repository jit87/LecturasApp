import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
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

  private librosNuevos$?: Observable<any>;
  private recomendacionesCache = new Map<string, Observable<any>>();
  private readonly CACHE_KEY = 'librosNuevos_cache';
  private readonly CACHE_TIME = 60 * 60 * 1000;


  constructor(private http: HttpClient) { super(); }

  //Datos de la API
  //Devuelve libros que coincidan con el titulo indicado
  getLibros(term: string): Observable<any> {
    return this.http.get(`${this.url}${term}&key=${this.Google_API_KEY}&maxResults=${this.max}`);
  }

  //Devuelve novedades de libros 
  getLibrosNuevos(): Observable<any> {
    //Comprobamos si hay caché válida en localStorage
    const cacheBruto = localStorage.getItem(this.CACHE_KEY);
    if (cacheBruto) {
      const cache = JSON.parse(cacheBruto);
      if (Date.now() - cache.timestamp < this.CACHE_TIME) {
        return of(cache.data);
      }
    }
    if (!this.librosNuevos$) {
      this.librosNuevos$ = this.http.get(`${this.url}subject:fiction&printType=books&orderBy=newest&maxResults=${this.max}&key=${this.Google_API_KEY}`).pipe(
        map((res: any) => {
          //Si hay libros devolvemos un vector de libros con el tamaño determinado por max o los que haya devuelto la API
          const items = res.items?.slice(0, this.max) || [];
          //Sustituimos items por el vector de libros limitado por max 
          return { ...res, items };
        }),
        tap((data) => {
          // Guardamos en localStorage con timestamp
          localStorage.setItem(this.CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data
          }));
        }),
        shareReplay(1),
        catchError(error => {
          console.error("Error en la API", error);
          this.librosNuevos$ = undefined;
          return of({ items: [] });
        }
        )
      );
    }
    return this.librosNuevos$;
  }

  getInfoLibroById(id: string): Observable<any> {
    return this.http.get(`${this.url.slice(0, this.url.length - 3)}/${id}?&key=${this.Google_API_KEY}`);
  }

  //Para las recomendaciones 
  getLibrosByTematica(tematica: string): Observable<any> {
    if (!tematica || tematica === 'Sin categoría') {
      return of({ items: [] });
    }
    const key = tematica.toLowerCase();
    if (this.recomendacionesCache.has(key)) {
      return this.recomendacionesCache.get(key)!;
    }
    const req$ = this.http.get(
      `${this.url}subject:${tematica}&key=${this.Google_API_KEY}&maxResults=${this.maxRecomendaciones}&orderBy=newest`
    ).pipe(
      shareReplay(1),
      catchError(error => {
        console.error("Error en recomendaciones", error);
        this.recomendacionesCache.delete(key);
        return of({ items: [] });
      })
    );
    this.recomendacionesCache.set(key, req$);
    return req$;
  }


  resetCache() {
    this.librosNuevos$ = undefined;
    localStorage.removeItem(this.CACHE_KEY);
  }




}
