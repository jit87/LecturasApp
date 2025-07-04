import { Schema, model } from 'mongoose';

const comentarioSchema = new Schema({
  _idUsuario: {
    type: String,
    required: true,
  },
  _idLibro: {
    type: String,
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


export default model('Comentario',  comentarioSchema);