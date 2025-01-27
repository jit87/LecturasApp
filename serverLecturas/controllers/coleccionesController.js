import Usuario from "../models/Usuario.js";
import Libro from "../models/Libro.js";


export async function agregarColeccion(req, res) { 

    const { coleccion } = req.body;
    
    try {
        const usuario = await Usuario.findById(req._idUsuario); 
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        usuario.colecciones.push(coleccion); 
        await usuario.save();
        res.json(usuario);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }

}



export async function obtenerColecciones(req, res) {

    try {
        const usuario = await Usuario.findById(req._idUsuario);  
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario.colecciones); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}

//Elimina la colección en la propiedad del usuario
export async function eliminarColeccion(req, res) {

    try {
        const usuario = await Usuario.findById(req._idUsuario);  
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        usuario.colecciones.pop(req.params.id);
        await usuario.save();
        //Eliminamos la asignación de la colección en la tabla de libros
        //await eliminarColeccionAsignada(usuario.colecciones[req.params.id]);
        res.json({ message: 'Colección eliminada' });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}



//Elimina la colección asignada en la tabla de libros
/*async function eliminarColeccionAsignada(coleccionId) {
    try {
        await Libro.updateMany(
            { coleccion: coleccionId }, 
            { $unset: { coleccion: "" } } 
        );
    } catch (error) {
        console.error('Error al eliminar la colección de los libros:', error);
        throw error; 
    }
}
*/

