import { Observable } from 'rxjs';

/*Métodos abstractos para desacoplar la implementación del servicio AuthService de los componentes*/
export abstract class AbstractAuthService {

    //OBSERVABLES
    abstract perfilImagen$: Observable<string>;
    abstract perfilApariencia$: Observable<string>;

    //MÉTODOS BÁSICOS
    abstract login(email: string, password: string): Observable<any>;
    abstract registro(nombre: string, email: string, password: string): Observable<any>;
    abstract logout(): void;

    //CONSULTAS
    abstract getToken(): string | null;
    abstract isAuthenticated(): boolean;
    abstract getUserById(id: string): Observable<any>;
    abstract getUserByEmail(email: string | null): Observable<any>;
    abstract getIdByEmail(email: string | null): Observable<any>;
    abstract isLoggedIn(): boolean;
    abstract authStatusListener(): Observable<boolean>;

    //MODIFICADORES
    abstract modificarPassword(email: string, actualPassword: string, nuevaPassword: string): Observable<any>;
    abstract modificarNombre(email: string, nuevoNombre: string): Observable<any>;
    abstract modificarEmail(email: string, nuevoEmail: string): Observable<any>;
    abstract modificarImagen(email: string, nuevoEmail: string): Observable<any>;
    abstract saveImage(email: string, file: string): Observable<any>;
    abstract actualizarImagenPerfil(nuevaImagen: string): void;
    abstract modificarBio(email: string, nuevaBio: string): Observable<any>;
    abstract modificarApariencia(email: string | null, value: string): Observable<any>;
    abstract eliminarUsuario(id: string): Observable<any>;

}
