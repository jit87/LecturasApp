import { Router } from 'express';
import { agregarSeguido, obtenerSeguidos, obtenerSeguidores, eliminarSeguido, obtenerSeguidoresPorId } from '../controllers/seguidosController.js';
import authenticate  from '../middlewares/authenticate.js'; 

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate); 

//Ruta para añadir un seguido
router.post('/', agregarSeguido); 

//Ruta para añadir un seguido
router.delete('/:id', eliminarSeguido); 

//Ruta para obtener todos los seguidos por el usuario
router.get('/todos', obtenerSeguidos); 

//Ruta para obtener todos los seguidos por el usuario
router.get('/seguidores', obtenerSeguidores); 

//Ruta para obtener todos los seguidores por usuario distinto al logueado
router.get('/seguidores/:id', obtenerSeguidoresPorId); 


export default router;