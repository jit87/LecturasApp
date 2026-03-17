import { Router } from 'express';
import { agregarComentario, obtenerComentarios, eliminarComentario } from '../controllers/comentariosController.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate);

//Ruta para añadir un comentario
router.post('/', agregarComentario);

//Ruta para obtener los comentarios por ID de libro
router.get('/todos/:idLibro/:tipo', obtenerComentarios);

//ruta para eliminar comentario por su ID
router.delete('/:id', eliminarComentario);


export default router; 