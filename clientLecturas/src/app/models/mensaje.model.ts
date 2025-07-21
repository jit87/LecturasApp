export class MensajeModel {
    _idChat: string;
    _idUsuario: string;
    nombre: string;
    texto: string;
    fecha: Date;

    constructor() {
        this._idChat = "";
        this._idUsuario = "";
        this.nombre = "";
        this.texto = "";
        this.fecha = new Date();
    }
}