import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import { crearMensaje } from '../controllers/mensajesController.js';

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate);

//Crea un mensaje
router.post('/', crearMensaje);

export default router; 