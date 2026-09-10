import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { environment } from '../environments/environment'
import { AbstractLibrosService } from '../abstracts/AbstractLibrosService';


@Injectable({
  providedIn: 'root'
})
export class LibrosService extends AbstractLibrosService {

  url: string = "https://www.googleapis.com/books/v1/volumes?q="
  Google_API_KEY: string = /*environment.Google_API_KEY;*/ "";
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

  //Datos de la API (primero Google Books API y después openLibrary)
  //Devuelve libros que coincidan con el titulo indicado
  getLibros(term: string): Observable<any> {
    const googleUrl = `${this.url}${term}&key=${this.Google_API_KEY}&maxResults=${this.max}`;

    return this.http.get(googleUrl).pipe(
      catchError(error => {
        console.warn("Google Books falló (503). Cambiando a Open Library...", error);

        const openLibraryUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(term)}&limit=${this.max}`;

        return this.http.get(openLibraryUrl).pipe(
          map((res: any) => {
            const items = (res.docs || []).map((doc: any) => ({
              id: doc.key,
              volumeInfo: {
                title: doc.title,
                authors: doc.author_name || ['Autor desconocido'],
                publisher: doc.publisher ? doc.publisher[0] : '',
                publishedDate: doc.first_publish_year?.toString() || '',
                description: '',
                pageCount: doc.number_of_pages_median || 0,
                imageLinks: {
                  thumbnail: doc.cover_i
                    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                    : (doc.isbn && doc.isbn.length > 0
                      ? `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`
                      : 'assets/imagen-no-disponible.png')
                },
                previewLink: `https://openlibrary.org${doc.key}`
              }
            }));
            return { items };
          }),
          catchError(fallbackError => {
            console.error("Open Library también falló", fallbackError);
            return of({ items: [] });
          })
        );
      })
    );
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
          //Guardamos en localStorage con timestamp
          localStorage.setItem(this.CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data
          }));
        }),
        shareReplay(1),
        catchError(error => {
          console.warn("Google Books falló al obtener novedades. Cambiando a Open Library...", error);

          const openLibraryUrl = `https://openlibrary.org/subjects/fiction.json?sort=new&limit=${this.max}`;

          return this.http.get(openLibraryUrl).pipe(
            switchMap((res: any) => this.mapearWorksOpenLibrary(res.works || [])),
            tap((data) => {
              localStorage.setItem(this.CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data
              }));
            }),
            catchError(fallbackError => {
              console.error("Open Library también falló en novedades", fallbackError);
              this.librosNuevos$ = undefined;
              return of({ items: [] });
            })
          );
        })
      );
    }
    return this.librosNuevos$;
  }

  getInfoLibroById(id: string): Observable<any> {
    //Si el ID es de Open Library
    if (id && (id.includes('OL') || id.startsWith('/'))) {
      const cleanId = id.startsWith('/') ? id : `/works/${id}`;
      const openLibraryUrl = `https://openlibrary.org${cleanId}.json`;

      return this.http.get(openLibraryUrl).pipe(
        switchMap((doc: any) => {
          //Si el work tiene portada, seguimos normalmente
          if (doc.covers?.[0]) {
            return of(doc);
          }
          //Si no tiene portada, buscamos en sus ediciones
          return this.http.get(
            `https://openlibrary.org${cleanId}/editions.json?limit=5`
          ).pipe(
            map((res: any) => {
              const edicion = res.entries?.find(
                (e: any) => e.covers?.[0]
              );
              if (edicion?.covers?.[0]) {
                doc.covers = edicion.covers;
              }
              return doc;
            }),
            catchError(() => of(doc))
          );
        }),
        map((doc: any) => {
          const urlPortada = doc.covers?.[0]
            ? `https://covers.openlibrary.org/b/id/${doc.covers[0]}-M.jpg`
            : 'assets/imagen-no-disponible.png';

          return {
            id: doc.key,
            volumeInfo: {
              title: doc.title,
              authors: [],
              description: typeof doc.description === 'string'
                ? doc.description
                : doc.description?.value || 'Sin descripción disponible',
              publishedDate: doc.first_publish_date || '',
              publisher: '',
              pageCount: 0,
              categories: doc.subjects
                ? doc.subjects.slice(0, 5).join(', ')
                : 'Sin categoría',
              imageLinks: {
                thumbnail: urlPortada,
                smallThumbnail: urlPortada
              },
              previewLink: `https://openlibrary.org${doc.key}`
            }
          };
        }),
        catchError(err => {
          console.error("Error al cargar detalle de Open Library", err);
          return of({
            volumeInfo: {
              title: 'Libro no disponible',
              description: 'No se pudo cargar la información.'
            }
          });
        })
      );
    }
    //Si es un ID normal de Google Books
    const googleDetailUrl =
      `${this.url.slice(0, this.url.length - 3)}/${id}?&key=${this.Google_API_KEY}`;

    return this.http.get(googleDetailUrl).pipe(
      catchError(error => {
        console.error("Error al cargar detalle de Google Books", error);
        return of({
          volumeInfo: {
            title: 'Error',
            description: 'No se pudo conectar con el servidor.'
          }
        });
      })
    );
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

  //AUX
  private mapearWorksOpenLibrary(works: any[]): Observable<any> {
    if (works.length === 0) return of({ items: [] });

    const peticiones = works.map((work: any) => {
      const urlPortada = work.cover_id
        ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
        : 'https://placehold.co/128x192?text=Sin+portada';
      const genérica = `Obra de ${work.authors?.[0]?.name || 'un autor desconocido'}${work.first_publish_year ? ` (${work.first_publish_year})` : ''}, disponible en el catálogo de Open Library.`;

      const base = {
        id: work.key,
        volumeInfo: {
          title: work.title,
          authors: work.authors?.map((a: any) => a.name) || ['Autor desconocido'],
          publisher: '',
          publishedDate: work.first_publish_year?.toString() || '',
          pageCount: 0,
          imageLinks: { thumbnail: urlPortada, smallThumbnail: urlPortada },
          previewLink: `https://openlibrary.org${work.key}`
        }
      };

      return this.http.get(`https://openlibrary.org${work.key}.json`).pipe(
        map((detalle: any) => {
          const desc = typeof detalle.description === 'string' ? detalle.description : detalle.description?.value;
          return { ...base, volumeInfo: { ...base.volumeInfo, description: desc || genérica } };
        }),
        catchError(() => of({ ...base, volumeInfo: { ...base.volumeInfo, description: genérica } }))
      );
    });

    return forkJoin(peticiones).pipe(map((items: any[]) => ({ items })));
  }
}