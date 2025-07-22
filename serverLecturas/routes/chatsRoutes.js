import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import { crearChat, obtenerChats } from '../controllers/chatsController.js';

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate);

//Crea un chat
router.post('/', crearChat);

//Obtiene los chats en función de id logueado
router.get('/todos/:id', obtenerChats);

export default router; 