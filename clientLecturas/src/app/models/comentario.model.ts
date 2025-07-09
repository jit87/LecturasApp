
export class ComentarioModel {
    _idUsuario:   string;
    _idLibro:     string; 
    texto:        string; 
    fecha:        Date;
    tipo:         string; 
    nombre:       string; 
    imagenUsuario: string;
    
    constructor() {
        this._idUsuario = ""; 
        this._idLibro = "";
        this.texto = ""; 
        this.fecha = new Date(); 
        this.tipo = "libro"; 
        this.nombre = ""; 
        this.imagenUsuario = ""; 
    }
    
}