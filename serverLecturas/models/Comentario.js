import { Schema, model } from 'mongoose';

const comentarioSchema = new Schema({
  _idUsuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  _idLibro: {
    type: Schema.Types.ObjectId,
    ref: 'Libro',
    required: true,
  },
  texto: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: false,
    default: Date.now
  },
  tipo: {
    type: String,
    required: true,
    default: 'libro'
  }
});

export default model('Comentario', comentarioSchema);