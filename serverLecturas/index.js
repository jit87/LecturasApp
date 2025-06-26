import mongoose from 'mongoose';
import app from './app.js'; 


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

        // Iniciar servidor en el puerto 4000
        app.listen(4000, () => {
            console.log("El servidor está corriendo correctamente en el puerto 4000");
        });

    } catch (err) {
        console.error(err);
    }
}

main().catch(console.error);
