import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import { crearMensaje, obtenerMensajes } from '../controllers/mensajesController.js';

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate);

//Crea un mensaje
router.post('/', crearMensaje);

//Obtenemos los mensajes en función del id del Chat
router.get('/todos/:id', obtenerMensajes);

export default router; 