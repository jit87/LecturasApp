import { Router } from 'express';
import { agregarSeguido, obtenerSeguidos } from '../controllers/seguidosController.js';
import authenticate  from '../middlewares/authenticate.js'; 

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate); 

//Ruta para añadir un seguido
router.post('/', agregarSeguido); 

//Ruta para obtener todos los seguidos por el usuario
router.get('/todos', obtenerSeguidos); 


export default router;