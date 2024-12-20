import { Router } from 'express';
import { agregarLibro, obtenerLibros, eliminarLibro, obtenerLibro } from '../controllers/librosController.js';
//import authenticate  from '../middlewares/authenticate.js'; 

const router = Router();

//Autenticamos todas las rutas
//router.use(authenticate); 

//Ruta para añadir una acción
router.post('/', agregarLibro); 

//Ruta para obtener todas las Libros
router.get('/todos/:id', obtenerLibros); 

/*
//Ruta para actualizar un libro
router.put('/:id', actualizarLibro);
*/
//Ruta para eliminar un libro
router.delete('/:id', eliminarLibro); 


//Ruta para obtener una Libro por su id
router.get('/:id', obtenerLibro); 


export default router;