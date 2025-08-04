
/*Métodos abstractos para desacoplar la implementación del servicio EstadoLibroService de los componentes*/
export abstract class AbstractEstadoLibroService {

    //GETTERS
    abstract getIdLibro(): string;
    abstract getTituloLibro(): string;
    abstract getEstadoLibro(): string;
    abstract getResenaLibro(): string;
    abstract getLibros(usuarioId: string): any;
    abstract estaGuardado(APIid: string): boolean;
    abstract getColeccionById(): string;

    //SETTERS
    abstract setIdLibro(id: string): void;
    abstract setTituloLibro(titulo: string): void;
    abstract setEstadoLibro(estado: string): void;
    abstract setColeccionLibro(coleccion: string): void;
    abstract setResenaLibro(resena: string): void;

}