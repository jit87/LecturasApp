import { Observable } from 'rxjs';
import { LibroModel } from '../models/libro.model';
import { ComentarioModel } from '../models/comentario.model';

/*Métodos abstractos para desacoplar la implementación del servicio LecturasBBDDService de los componentes*/
export abstract class AbstractLecturasBBDDService {

    //Libros
    abstract getListLibros(_idUsuario: string): Observable<any>;
    abstract addlibro(libro: LibroModel): Observable<any>;
    abstract deletelibro(libroId: string): Observable<any>;
    abstract getlibroById(libroId: string): Observable<any>;
    abstract getlibroByAPIid(APIid: string): Observable<any>;
    abstract updatelibro(libro: LibroModel, libroId: string | undefined): Observable<any>;

    //Colecciones
    abstract addColeccion(coleccion: string): Observable<any>;
    abstract getListColecciones(_idUsuario: string): Observable<any>;
    abstract deleteColeccion(coleccionId: number): Observable<any>;

    //Actividad general/social
    abstract getListLibrosUsuarios(): Observable<any>;
    abstract setSeguido(idSeguido: string): Observable<any>;
    abstract deleteSeguido(idSeguido: string): Observable<any>;
    abstract getSeguidos(): Observable<any>;
    abstract getSeguidores(): Observable<any>;
    abstract getSeguidoresById(id: string): Observable<any>;
    abstract getSeguidosById(id: string): Observable<any>;
    abstract getLibrosLeidos(_idUsuario: string): Observable<any>;

    //Comentarios
    abstract addComentario(nuevoComentario: ComentarioModel): Observable<any>;
    abstract getComentarios(_idLibro: string, tipo: string): Observable<any>;

}
