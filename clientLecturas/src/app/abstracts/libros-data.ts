import { Observable } from 'rxjs';
import { LibroModel } from '../models/libro.model';

/*Métodos abstractos para desacoplar la implementación del servicio LibrosService de los componentes*/
export abstract class LibrosData {
    abstract getLibros(term: string): Observable<any>;
    abstract getLibrosNuevos(): Observable<any>;
    abstract getInfoLibroById(id: string): Observable<any>;
    abstract getLibrosByTematica(tematica: string): Observable<any>;
}