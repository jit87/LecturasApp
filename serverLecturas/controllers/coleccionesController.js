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
        //Eliminamos la asignación de la colección en la tabla de libros en función del usuario
        await eliminarColeccionAsignada(usuario.colecciones[req.params.id], req._idUsuario);

        //Eliminamos la colección en la propiedad del usuario
        usuario.colecciones.splice(req.params.id, 1);
        await usuario.save();
        res.json({ message: 'Colección eliminada' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}



//Elimina la colección asignada en la tabla de libros
async function eliminarColeccionAsignada(coleccionId, usuarioID) {

    try {
        await Libro.updateMany(
            { _idUsuario: usuarioID, coleccion: coleccionId }, 
            { $unset: { coleccion: "" } } 
        );
        return { success: true, message: 'Libros actualizados' };
        
    } catch (error) {
        console.error('Error al eliminar la colección de los libros:', error);
        throw error; 
    }

}


