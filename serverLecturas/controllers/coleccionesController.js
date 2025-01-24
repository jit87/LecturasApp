import Usuario from "../models/Usuario.js";


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

