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
            //Guarda el id del seguido en el seguidor
            usuario.seguidos.push(idSeguido); 
            await usuario.save();
            //Guarda el id del seguidor en el seguido
            await agregarSeguidor(req._idUsuario, idSeguido);
            res.json(usuario);
    } catch (err) {
        res.status(500).send(err);
    }
}


//Guarda el id del seguido en el seguidor
async function agregarSeguidor(seguidor, seguido) {
    try {
            //Busca al usuario seguido
            const usuario = await Usuario.findById(seguido); 
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            //Guarda el id del seguido
            usuario.seguidores.push(seguidor); 
            await usuario.save();
            res.json(usuario);
    } catch (err) {
        res.status(500).send(err);
    }
}


export async function obtenerSeguidos(req, res) {

    try {
        const usuario =  await Usuario.findById(req._idUsuario); 
        res.json(usuario.seguidos); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}

export async function obtenerSeguidores(req, res) {

    try {
        const usuario =  await Usuario.findById(req._idUsuario); 
        res.json(usuario.seguidores); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}



//Función para eliminar seguidos
export async function eliminarSeguido(req, res) {
    try {
            const idSeguido = req.params.id;
       
            //Busca al usuario logueado 
            const usuario =  await Usuario.findById(req._idUsuario); 
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
             //Busca la posición del seguido
            const posicion = usuario.seguidos.indexOf(idSeguido);
            usuario.seguidos.splice(posicion,1);
            await usuario.save();
        
            //Eliminar el seguidor en el seguido 
            await eliminarSeguidor(req._idUsuario, idSeguido); 
           
    } catch (err) {
        console.error(err);
    }
}



//Elimina el seguidor en el seguido
export async function eliminarSeguidor(seguidor, idSeguido) {
    try {
            //Busca al usuario seguido
            const usuarioSeguido = await Usuario.findById(idSeguido);
            if (!usuarioSeguido) {
                console.log('Usuario no encontrado');
            }
            //Actualizamos el array de seguidores del usuario seguido
            const posicion = usuarioSeguido.seguidores.indexOf(seguidor);
            usuarioSeguido.seguidores.splice(posicion, 1);    
            await usuarioSeguido.save();
            console.log('Seguidor eliminado');
    } catch (err) {
        console.error(err);
    }
}


//Función para obtener seguidos por id
export async function obtenerSeguidoresPorId(req, res) {
    try {
        const usuario = await Usuario.findById({ _id: req.params.id }); 
        res.json(usuario.seguidores); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}

//Función para obtener seguidores por id
export async function obtenerSeguidosPorId(req, res) {
    try {
        const usuario = await Usuario.findById({ _id: req.params.id }); 
        res.json(usuario.seguidos); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
  }
  
}