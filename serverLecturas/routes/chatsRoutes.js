import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import { crearChat } from '../controllers/chatsController.js';

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate);

//Crea un chat
router.post('/', crearChat);

export default router; 