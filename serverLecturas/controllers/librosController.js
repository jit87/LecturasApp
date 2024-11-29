import Libro from "../models/Libro.js";



export async function agregarLibro(req, res) {

  const { _idUsuario,titulo,autores,editor,fechaPublicacion,descripcion,pageCount,averageRating,ratingsCount,contentVersion,imagen,lengua,previewLink,estado,coleccion } = req.body;

  const nuevoLibro = new Libro({
        _idUsuario,
        titulo,
        autores,
        editor,
        fechaPublicacion,
        descripcion,
        pageCount,
        averageRating,
        ratingsCount,
        contentVersion,
        imagen,
        lengua,
        previewLink,
        estado,
        coleccion,
  });
  
  try {
    const libroGuardado = await nuevoLibro.save();
    res.status(201).json(libroGuardado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}




export async function obtenerLibros(req, res) {

    try {
        const Libros = await Libro.find({ _id: req.usuarioId }); 
        res.json(Libros); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}

/*



export async function actualizarLibro(req, res) {

     try {
        const { nombre, ticker, precio, cantidad, capitalInvertido, industria, valoracion } = req.body;

        const Libro = await Libro.findById(req.params.id);

        if (!Libro) {
            return res.status(404).json({ msg: 'No existe esta Libro' });
        }

        if (Libro.usuarioId.toString() !== req.usuarioId) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar esta Libro' });
        }

        Libro.nombre = nombre || Libro.nombre;
        Libro.ticker = ticker || Libro.ticker;
        Libro.precio = precio || Libro.precio;
        Libro.cantidad = cantidad || Libro.cantidad;
        Libro.capitalInvertido = capitalInvertido || Libro.capitalInvertido;
        Libro.industria = industria || Libro.industria;
        Libro.valoracion = valoracion || Libro.valoracion; 
       

        const LibroActualizada = await Libro.save();

        res.json(LibroActualizada);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}




export async function eliminarLibro(req, res) {

   try {
        const Libro = await Libro.findById(req.params.id);
        
        if (!Libro) return res.status(404).json({ message: 'Libro no encontrada' });

        if (Libro.usuarioId.toString() !== req.usuarioId) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta Libro' });
        }
        
        await Libro.deleteOne({ _id: req.params.id });
        res.json({ message: 'Libro eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
  }
  
}



export async function obtenerLibro(req, res) {

    try {
        const Libro = await Libro.findById(req.params.id);

        if (!Libro) return res.status(404).json({ message: 'Libro no encontrada' });

        if (Libro.usuarioId.toString() !== req.usuarioId) {
          return res.status(403).json({ message: 'No tienes permiso para acceder a esta Libro' });
        }

        res.json(Libro);

    } catch (err) {
        res.status(500).json({ message: err.message });
  }
  
}*/