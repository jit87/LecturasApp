import express from 'express';
import dotenv from 'dotenv';
import { registro, login, getUserByEmail, getIdByEmail, modificarPassword, modificarNombre, modificarEmail, modificarImagen, modificarApariencia, getUserById, eliminarUsuario, modificarBio } from '../controllers/authController.js';

dotenv.config();

const router = express.Router();


router.post('/registro', registro);

router.post('/login', login);

//Ruta para obtener usuario en función del email
router.get('/usuario/:email', getUserByEmail);

//Ruta para obtener el ID en función del email
router.get('/usuarioId/:email', getIdByEmail);

//Ruta para modificar contraseña
router.put('/modificar-pass', modificarPassword);

//Ruta para modificar nombre
router.put('/modificar-nombre', modificarNombre);

//Ruta para modificar email
router.put('/modificar-email', modificarEmail);

//Ruta para modificar imagen
router.put('/modificar-imagen', modificarImagen);

//Ruta para modificar biografía
router.put('/modificar-bio', modificarBio);

//Ruta para modificar apariencia
router.put('/modificar-apariencia', modificarApariencia);

//Ruta para obtener el usuario en función del ID (para la parte de Social)
router.get('/usuarioPorId/:id', getUserById);

//Ruta para eliminar usuario
router.delete('/eliminar-usuario/:id', eliminarUsuario);


export default router;