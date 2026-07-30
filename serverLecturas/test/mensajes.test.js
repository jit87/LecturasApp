import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import sinon from 'sinon';
import * as webSocketServer from '../websockets/webSocketServer.js';

describe('Mensajes', () => {
    let tokenA = '';
    let idUsuarioA = '';
    let idUsuarioB = '';
    let chatId = '';
    let mensajeId = '';

    before(async () => {
        await request(app).post('/registro').send({
            nombre: 'Mensaje Usuario A',
            email: 'mensajeA@test.com',
            password: '123456'
        });
        await request(app).post('/registro').send({
            nombre: 'Mensaje Usuario B',
            email: 'mensajeB@test.com',
            password: '123456'
        });

        const resA = await request(app).post('/login').send({
            email: 'mensajeA@test.com',
            password: '123456'
        });
        tokenA = resA.body.token;

        const usuarioA = await request(app)
            .get('/usuario/mensajeA@test.com')
            .set('Authorization', `Bearer ${tokenA}`);
        idUsuarioA = usuarioA.body._id;

        const usuarioB = await request(app)
            .get('/usuario/mensajeB@test.com')
            .set('Authorization', `Bearer ${tokenA}`);
        idUsuarioB = usuarioB.body._id;

        //Creamos un chat entre A y B
        const chat = await request(app)
            .post('/chats')
            .set('Authorization', `Bearer ${tokenA}`)
            .send({
                participantes: [idUsuarioA, idUsuarioB],
                ultimoMensaje: '',
                fecha: new Date()
            });
        chatId = chat.body._id;
    });

    it('debe crear un mensaje', async () => {
        const res = await request(app)
            .post('/mensajes')
            .set('Authorization', `Bearer ${tokenA}`)
            .send({
                _idChat: chatId,
                _idUsuario: idUsuarioA,
                nombre: 'Mensaje Usuario A',
                texto: 'Hola',
                fecha: new Date()
            });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('texto', 'Hola');
        mensajeId = res.body._id;
    });

    it('debe obtener los mensajes de un chat', async () => {
        const res = await request(app)
            .get(`/mensajes/todos/${chatId}`)
            .set('Authorization', `Bearer ${tokenA}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });

    it('no debe acceder sin token', async () => {
        const res = await request(app).get(`/mensajes/todos/${chatId}`);
        expect(res.status).to.equal(401);
    });
});