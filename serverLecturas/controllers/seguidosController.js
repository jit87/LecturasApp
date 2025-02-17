import Usuario from "../models/Usuario.js";


//Función para añadir seguidos
export async function agregarSeguido(req, res) {

    try {
        const { email, id } = req.body;

            //Busca al usuario por email
            const usuario = await Usuario.findOne({ email });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            //Actualiza y guarda los seguidos
            usuario.seguidos.push(id); 
            await usuario.save();
            res.json(usuario);
    } catch (err) {
        res.status(500).send(err);
    }
}
