import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;

export function configurarWebSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        },
    });

    //Validación de JWT en el handshake
    //Se comprueba que el token guardado por el usuario en localstorage coincida con TOKEN_SECRET
    //Ese token se lo proporcionó el servidor cuando hizo login
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) return next(new Error('No autorizado'));

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) return next(new Error('Token inválido'));
            socket._idUsuario = decoded.id;
            next();
        })
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('joinChat', (idChat) => {
            socket.join(idChat)
        })

        socket.on('disconnect', () => console.log('user disconnected'));
    });


}

export function getIO() {
    if (!io) throw new Error("Socket.io no ha sido inicializado");
    return io;
}