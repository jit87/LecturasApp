export class UsuarioModel {

_id?: string; 
email: string | undefined;
password: string | undefined;
nombre: string | undefined; 
colecciones?: string[];
imagen?: string | undefined;
seguidores?: string[];
seguidos?: string[];
bio?: string | undefined;
apariencia?: string | undefined; 
    
constructor(){}

}