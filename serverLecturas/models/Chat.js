import mongoose from "mongoose"

const ChatSchema = new mongoose.Schema({
    participantes: {
        type: [],
        required: true
    },
    ultimoMensaje: {
        type: String,
        default: "",
        required: false
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Chat', ChatSchema); 