import Libro from "../models/Libro.js";



export async function agregarLibro(req, res) {

  const { _idUsuario,titulo,autores,editor,fechaPublicacion,descripcion,pageCount,averageRating,ratingsCount,contentVersion,imagen,lengua,previewLink,estado,coleccion,categorias,APIid } = req.body;

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
        categorias,
        APIid
  });
  
  try {
    const libroGuardado = await nuevoLibro.save();
    res.status(201).json(libroGuardado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//NOTA
/*Para que funcione bien el parámetro de usuario (en este caso _idUsuario) 
y poder autenticar cada consulta a la BBDD  se requiere configurar un middleware (authenticate.js) en este backend 
y luego configurar un interceptor en el frontend*/

export async function obtenerLibros(req, res) {

    try {
        const libros = await Libro.find({ _idUsuario: req._idUsuario}); 
        res.json(libros); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}




export async function actualizarLibro(req, res) {

     try {
        const { estado, coleccion } = req.body;

        const libro = await Libro.findById(req.params.id);

        if (!libro) {
            return res.status(404).json({ msg: 'No existe este Libro' });
        }

        if (libro._idUsuario.toString() !== req._idUsuario) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar este Libro' });
        }

        libro.estado = estado || libro.estado;
        libro.coleccion = coleccion || libro.coleccion;
       

        const libroActualizado = await libro.save();
        res.json(libroActualizado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}




export async function eliminarLibro(req, res) {

  try {
    const libro = await Libro.findById(req.params.id);
        
        if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });

        if (libro._idUsuario.toString() !== req._idUsuario) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este Libro' });
        }
        
        await Libro.deleteOne({ _id: req.params.id });
        res.json({ message: 'Libro eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
  }
  
}



export async function obtenerLibro(req, res) {

    try {
        const libro = await Libro.findById(req.params.id);

        if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });

        if (libro._idUsuario.toString() !== req._idUsuario) {
          return res.status(403).json({ message: 'No tienes permiso para acceder a este Libro' });
        }

        res.json(libro);

    } catch (err) {
        res.status(500).json({ message: err.message });
  }
  
}


//Si encuentra el libro guardado en la BBDD, devuelve un objeto JSON con la propiedad encontrado a true.
export async function obtenerLibroAPIid(req, res) {
    try {
        //Buscamos por usuario y APIid
        const libro = await Libro.findOne({
            APIid: req.params.APIid,
             _idUsuario: req._idUsuario 
         });

        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        if (libro._idUsuario.toString() !== req._idUsuario) {
            return res.status(403).json({ message: 'No tienes permiso para acceder a este Libro' });
        }

        res.json({ encontrado: true });

    } catch (err) {
        console.error('Error al buscar el libro:', err.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}




//Para la parte de Social de la app
export async function obtenerTodosLibros(req, res) {

  try {
      const libros = await Libro.find({})
        .sort({ createdAt: -1,  updatedAt: -1 })
        .limit(8); 

        res.json(libros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los libros recientes" });
    }

}




