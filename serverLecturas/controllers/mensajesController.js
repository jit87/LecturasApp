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
    } catch (err) {
        res.status(400).json({ message: err.message });
    }


}