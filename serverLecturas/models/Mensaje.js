import mongoose from 'mongoose';

const MensajeSchema = new mongoose.Schema({
    _idChat: {
        type: String,
        required: true
    },
    _idUsuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Mensaje', MensajeSchema);
