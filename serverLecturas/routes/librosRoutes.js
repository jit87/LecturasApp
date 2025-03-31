import { Router } from 'express';
import { agregarLibro, obtenerLibros, eliminarLibro, obtenerLibro, obtenerLibroAPIid, actualizarLibro, obtenerTodosLibros, obtenerLibrosLeidos } from '../controllers/librosController.js';
import authenticate  from '../middlewares/authenticate.js'; 

const router = Router();

//Autenticamos todas las rutas
router.use(authenticate); 


//Ruta para añadir un libro
router.post('/', agregarLibro); 


//Ruta para obtener todos los libros
router.get('/todos/:id', obtenerLibros); 


//Ruta para actualizar un libro
router.put('/:id', actualizarLibro);


//Ruta para eliminar un libro
router.delete('/:id', eliminarLibro); 


//Ruta para obtener un libro por su id
router.get('/libro/:id', obtenerLibro); 


//Ruta para obtener un libro por su APIid
router.get('/APIid/:APIid', obtenerLibroAPIid); 


//Ruta para obtener todos los libros
router.get('/todos', obtenerTodosLibros);


//Ruta para obtener todos los libros leídos por el usuario
router.get('/leidos/:id', obtenerLibrosLeidos);


export default router;