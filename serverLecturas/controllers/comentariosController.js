import Comentario from "../models/Comentario.js";
import Usuario from "../models/Usuario.js";



export async function agregarComentario(req, res) {

  const { _id,_idLibro,texto,fecha,tipo } = req.body;

  const nuevoComentario = new Comentario({
      _id,
      _idLibro,
      texto,
      fecha,
      tipo,
  });
    
    try {  
        const usuario = await Usuario.findById(req._idUsuario);
        if (!usuario) {
           return res.status(404).json({ message: 'Usuario no encontrado' });
        } 
        const comentarioGuardado = await nuevoComentario.save();
        res.status(201).json(comentarioGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    
}



