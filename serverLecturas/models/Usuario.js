import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  colecciones: { type: [String], required: false, default: [] },
  imagen: { type: String, required: false, default: '' },
  seguidores: { type: [mongoose.Schema.Types.ObjectId], ref: 'Usuario', default: [] },
  seguidos: { type: [mongoose.Schema.Types.ObjectId], ref: 'Usuario', default: [] },
  bio: { type: String, required: false },
  apariencia: { type: String, required: false },
  librosLeidos: { type: [String], required: false, default: [] }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('Usuario', userSchema);