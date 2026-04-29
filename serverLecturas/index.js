import mongoose from 'mongoose';
import app from './app.js';
import { createServer } from "http";
import { configurarWebSocket } from './websockets/webSocketServer.js';

//URI de conexión
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/LecturasApp";
const PORT = process.env.PORT || 4000;

async function main() {
    try {
        //Conecta al cliente. Usamos la librería mongoose.
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conectado a MongoDB correctamente");

        //Creamos servidor HTTP, pues el websocket lo requiere
        const servidorHTTP = createServer(app);

        //Añade el WebSocket al servidor (servidorHTTP)
        configurarWebSocket(servidorHTTP);

        //Inicia el servidor en el puerto 4000
        servidorHTTP.listen(PORT, '0.0.0.0', () => {
            console.log("El servidor está corriendo correctamente en el puerto 4000");
        });

    } catch (err) {
        console.error(err);
    }
}

main().catch(console.error);
