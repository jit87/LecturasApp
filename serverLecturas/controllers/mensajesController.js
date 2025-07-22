import Usuario from "../models/Usuario.js";
import Mensaje from "../models/Mensaje.js";
import Chat from "../models/Chat.js";


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
        await nuevoMensaje.save();

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



