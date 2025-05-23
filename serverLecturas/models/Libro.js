import { Schema, model } from 'mongoose';

const libroSchema = new Schema({
  _idUsuario: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  autores: {
    type: [String],
    required: true,
  },
  editor: {
    type: String,
    required: false,
  },
  fechaPublicacion: {
    type: String,
    required: false,
  },
  descripcion: {
    type: String,
    required: false,
  },
  pageCount: {
    type: Number,
    required: false,
  },
  averageRating: {
    type: Number,
    required: false,
  },
  ratingsCount: {
    type: Number,
    required: false,
  },
  contentVersion: {
    type: String,
    required: false,
  },
  imagen: {
    type: String,
    required: false,
  },
  lengua: {
    type: String,
    required: false,
  },
  previewLink: {
    type: String,
    required: false,
  },
  estado: {
    type: String,
    default: "Pendiente",
  },
  coleccion: {
    type: String,
    default: "No clasificado",
  },
  categorias: {
    type: String,
    required: false,
  },
  APIid: {
    type: String,
    required: false
  },
  resena: {
    type: String,
    required: false,
  }
}, {
  timestamps: true, 
});

export default model('Libro', libroSchema);
