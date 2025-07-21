export class ChatModel {
    participantes: string[];
    ultimoMensaje: string;
    fecha: Date

    constructor() {
        this.participantes = [];
        this.ultimoMensaje = "";
        this.fecha = new Date();
    }

}