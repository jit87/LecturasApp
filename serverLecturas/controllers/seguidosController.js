import Usuario from "../models/Usuario.js";


//Función para añadir seguidos
export async function agregarSeguido(req, res) {
    try {
        const { idSeguido } = req.body;
            //Busca al usuario logueado 
            const usuario =  await Usuario.findById(req._idUsuario); 
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            //Guarda el id del seguido
            usuario.seguidos.push(idSeguido); 
            await usuario.save();
            res.json(usuario);
    } catch (err) {
        res.status(500).send(err);
    }
}
