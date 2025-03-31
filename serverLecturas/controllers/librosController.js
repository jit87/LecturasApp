import Libro from "../models/Libro.js";
import Usuario from "../models/Usuario.js";



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
        //Si el libro ya se ha leído agregamos el libro a la lista de libros leídos del usuario
        if (nuevoLibro.estado === "Leído") {
            const usuario = await Usuario.findById(req._idUsuario);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            usuario.librosLeidos.push(nuevoLibro._id);
            await usuario.save();
        }
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
        
         //Si el libro ya se ha leído agregamos el libro a la lista de libros leídos del usuario
         if (libro.estado === "Leído") {
            const usuario = await Usuario.findById(req._idUsuario);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            usuario.librosLeidos.push(libro._id);
            await usuario.save();
          }
       
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
        const usuarioId = req._idUsuario;

        //Obtenemos los seguidos por el usuario logueado
        const data = await Usuario.findById(usuarioId).select("seguidos");
        const seguidos = data ? data.seguidos : [];

        //Libros de los seguidos
        const librosSeguidos = await Libro.find({ _idUsuario: { $in: seguidos } })
            .sort({ updatedAt: -1 })
            .limit(8);

        //Si no hay suficientes libros de seguidos completamos con otros libros recientes
        const librosResto = await Libro.find({ _idUsuario: { $nin: seguidos } })
            .sort({ updatedAt: -1 })
            .limit(8 - librosSeguidos.length); 

        //Unir ambas listas
        const libros = [...librosSeguidos, ...librosResto];

        res.json(libros);

      /*
      const libros = await Libro.find({})
        .sort({ createdAt: -1,  updatedAt: -1 })
        .limit(8); 

        res.json(libros);*/
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los libros recientes" });
    }

}



export async function obtenerLibrosLeidos(req, res) {
    
    try {
        const usuarioId = req._idUsuario;
        const librosLeidos = await Usuario.findById(usuarioId).select("librosLeidos");
        //const librosLeidos = data ? data.librosLeidos : [];
        res.json(librosLeidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los libros leídos" });
    }

}


