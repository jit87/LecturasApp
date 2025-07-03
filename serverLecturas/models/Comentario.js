import { Schema, model } from 'mongoose';

const comentarioSchema = new Schema({
  _idUsuario: {
    type: String,
    required: true,
    unique: true
  },
  _idLibro: {
    type: String,
    required: true,
    unique: true
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