import express from 'express'; 
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; 


// Crear servidor
const app = express();

// Habilitar middleware para parsear JSON
app.use(express.json());

//Configurar CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};
app.use(cors(corsOptions));

// URI de conexión
const uri = "mongodb://localhost:27017/LecturasApp";

async function main() {
    try {
        // Conectar al cliente. Usamos la librería mongoose.
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conectado a MongoDB correctamente");

        // Ruta principal
        /*app.get('/', (req, res) => {
            res.send('Hola mundo');
        });*/

        //Permite usar objetos js
        app.use(express.json()); 

        
        // Registrar el enrutador para la ruta 
        app.use('/', authRoutes);

        // Iniciar servidor en el puerto 4000
        app.listen(4000, () => {
            console.log("El servidor está corriendo correctamente en el puerto 4000");
        });

    } catch (err) {
        console.error(err);
    }
}

main().catch(console.error);
