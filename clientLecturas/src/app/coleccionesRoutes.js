import { Router } from 'express';
import { agregarColeccion,obtenerColecciones,eliminarColeccion } from '../controllers/coleccionesController.js';
import authenticate  from '../middlewares/authenticate.js'; 

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate); 

//Ruta para añadir un coleccion
router.post('/', agregarColeccion); 

//Ruta para obtener todos los coleccions
router.get('/todas/:id', obtenerColecciones);

//Ruta para actualizar un coleccion
//router.put('/:id', actualizarColeccion);

//Ruta para eliminar un coleccion
router.delete('/:id', eliminarColeccion);



export default router;