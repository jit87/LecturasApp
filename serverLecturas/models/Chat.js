import mongoose from "mongoose"

const ChatSchema = new mongoose.Schema({
    participantes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Usuario',
        required: true
    },
    ultimoMensaje: {
        type: String,
        default: "",
        required: false
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Chat', ChatSchema);