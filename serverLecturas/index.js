import express from 'express'; 
import mongoose from 'mongoose';
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

//URI de conexión
const uri = "mongodb://localhost:27017/LecturasApp";

async function main() {
    try {
        // Conectar al cliente. Usamos la librería mongoose.
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conectado a MongoDB correctamente");

        //Permite usar objetos js
        app.use(express.json()); 
        
        //Registra el enrutador para la ruta de autenticación 
        app.use('/', authRoutes);

        //Registra la ruta de gestión de libros
        app.use('/libros', librosRoutes);

        //Registra la ruta de gestión de colecciones
        app.use('/colecciones', coleccionesRoutes);

        //Registra la ruta de gestión de seguidos
        app.use('/seguidos', seguidosRoutes);

        // Iniciar servidor en el puerto 4000
        app.listen(4000, () => {
            console.log("El servidor está corriendo correctamente en el puerto 4000");
        });

    } catch (err) {
        console.error(err);
    }
}

main().catch(console.error);
