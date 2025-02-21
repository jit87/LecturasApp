import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
    _idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Libro", required: true },
    texto: { type: String, required: true }, 
    puntuacion: { type: Number, min: 0, max: 10, required: false }, 
    fecha: { type: Date, default: Date.now },
    comentarios: [
        {
            usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
            texto: { type: String, required: true },
            fecha: { type: Date, default: Date.now }
        }
    ]
});


export default model("Review", reviewSchema);
