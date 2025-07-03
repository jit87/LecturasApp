import { Router } from 'express';
import { agregarComentario } from '../controllers/comentariosController.js';
import authenticate  from '../middlewares/authenticate.js'; 

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate); 


//Ruta para añadir un libro
router.post('/', agregarComentario); 


export default router;