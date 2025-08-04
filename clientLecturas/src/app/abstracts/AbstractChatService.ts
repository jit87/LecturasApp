import { Observable } from "rxjs";
import { ChatModel } from "../models/chat.model";
import { MensajeModel } from "../models/mensaje.model";

/*Métodos abstractos para desacoplar la implementación del servicio ChatService de los componentes*/
export abstract class AbstractChatService {

    abstract crearChat(chat: ChatModel): Observable<any>;
    abstract crearMensaje(mensaje: MensajeModel): Observable<any>;
    abstract getChats(_idUsuario: string): Observable<any>;
    abstract getMensajes(_idChat: string): Observable<any>;

}