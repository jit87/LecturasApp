import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';


dotenv.config();
let io;

export function configurarWebSocket(server) {
    io = new SocketIOServer(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
            //allowedHeaders: ['Content-Type', 'Authorization'],
            // credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => console.log('user disconnected'));
    });


}

export function getIO() {
    if (!io) throw new Error("Socket.io no ha sido inicializado");
    return io;
}