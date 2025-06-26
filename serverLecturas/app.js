import express from 'express'; 
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; 
import librosRoutes from './routes/librosRoutes.js'; 
import coleccionesRoutes from './routes/coleccionesRoutes.js';
import seguidosRoutes from './routes/seguidosRoutes.js';

//Crear servidor
const app = express();

//Habilitar middleware para parsear JSON
app.use(express.json());

//Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};
app.use(cors(corsOptions));

//Rutas
//Registra el enrutador para la ruta de autenticación 
app.use('/', authRoutes);

//Registra la ruta de gestión de libros
app.use('/libros', librosRoutes);

//Registra la ruta de gestión de colecciones
app.use('/colecciones', coleccionesRoutes);

//Registra la ruta de gestión de seguidos
app.use('/seguidos', seguidosRoutes);

export default app; 