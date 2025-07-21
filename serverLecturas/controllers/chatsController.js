import Usuario from "../models/Usuario.js";
import Chat from "../models/Chat.js";

export async function crearChat(req, res) {

    const { participantes, ultimoMensaje, fecha } = req.body;

    try {
        var nuevoChat = await Chat.findOne({ participantes: { $all: participantes } });

        if (!nuevoChat) {
            nuevoChat = new Chat({
                participantes,
                ultimoMensaje,
                fecha
            })
            await nuevoChat.save();
        }
        res.status(201).json(nuevoChat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}


