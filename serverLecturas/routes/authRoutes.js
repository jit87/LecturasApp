import express from 'express';
import dotenv from 'dotenv';
import authenticate from '../middlewares/authenticate.js';
import { registro, login, getUserByEmail, getIdByEmail, modificarPassword, modificarNombre, modificarEmail, modificarImagen, modificarApariencia, getUserById, eliminarUsuario, modificarBio } from '../controllers/authController.js';

dotenv.config();

const router = express.Router();

//Rutas públicas
router.post('/registro', registro);
router.post('/login', login);

//Rutas protegidas
router.get('/usuario/:email', authenticate, getUserByEmail);
router.get('/usuarioId/:email', authenticate, getIdByEmail);
router.put('/modificar-pass', authenticate, modificarPassword);
router.put('/modificar-nombre', authenticate, modificarNombre);
router.put('/modificar-email', authenticate, modificarEmail);
router.put('/modificar-imagen', authenticate, modificarImagen);
router.put('/modificar-bio', authenticate, modificarBio);
router.put('/modificar-apariencia', authenticate, modificarApariencia);
router.get('/usuarioPorId/:id', authenticate, getUserById);
router.delete('/eliminar-usuario/:id', authenticate, eliminarUsuario);


export default router;