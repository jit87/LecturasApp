import Mensaje from "../models/Mensaje.js";
import { getIO } from "../websockets/webSocketServer.js";

export async function crearMensaje(req, res) {

    const { _idChat, _idUsuario, nombre, texto, fecha } = req.body;

    const nuevoMensaje = new Mensaje({
        _idChat,
        _idUsuario,
        nombre,
        texto,
        fecha
    })

    try {
        //Guardamos el mensaje
        await nuevoMensaje.save();

        //Emitimos la notificación al websocket
        const io = getIO();
        //Sólo a los usuarios de la misma room del chat
        io.to(_idChat).emit("nuevoMensaje", {
            _idChat,
            _idUsuario,
            nombre,
            texto,
            fecha,
        });

        res.status(201).json(nuevoMensaje);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}


export async function obtenerMensajes(req, res) {

    try {
        const mensajes = await Mensaje.find({ _idChat: req.params.id });
        res.json(mensajes);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}



