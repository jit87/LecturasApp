
export class ComentarioModel {
    _idUsuario:   string | any;
    _idLibro:      string; 
    texto:         string; 
    fecha:         Date;
    tipo:          string; 
    
    constructor() {
        this._idUsuario = ""; 
        this._idLibro = "";
        this.texto = ""; 
        this.fecha = new Date(); 
        this.tipo = "libro"; 
    }
    
}