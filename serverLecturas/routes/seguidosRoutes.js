import { Router } from 'express';
import { agregarSeguido } from '../controllers/seguidosController.js';
import authenticate  from '../middlewares/authenticate.js'; 

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate); 

//Ruta para añadir un seguido
router.post('/', agregarSeguido); 


export default router;