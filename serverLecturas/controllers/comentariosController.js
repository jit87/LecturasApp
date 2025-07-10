import Comentario from "../models/Comentario.js";
import Usuario from "../models/Usuario.js";



export async function agregarComentario(req, res) {

  const { _idUsuario,_idLibro,texto,fecha,tipo } = req.body;

  const nuevoComentario = new Comentario({
      _idUsuario,
      _idLibro,
      texto,
      fecha,
      tipo
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



export async function eliminarComentario(req, res) {

  try {
        var comentario = await Comentario.findById(req.params._id);
       
        await Comentario.deleteOne({ _id: req.params._id });
        res.json({ message: 'Libro eliminada' });
      
        if (req.params._id === undefined) {
          comentario = await Comentario.find({
            _idUsuario: req._idUsuario,
            _idLibro: req.params._idLibro
          });
          await Comentario.deleteMany({
            _idUsuario: req._idUsuario,
            _idLibro: req.params._idLibro
          });
            return res.json({ message: 'Comentarios eliminados' });
        }
      
      if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
  }
  
}



export async function obtenerComentarios(req, res) {

    try {
        const comentarios = await Comentario.find({
          _idLibro: req.params.idLibro,
          tipo: req.params.tipo
        });

        if (!comentarios) return res.status(404).json({ message: 'Libro no encontrado' });

        res.json(comentarios);

    } catch (err) {
        res.status(500).json({ message: err.message });
  }
  
}



