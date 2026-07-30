import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('Chats', () => {
    let tokenA = '';
    let tokenB = '';
    let idUsuarioA = '';
    let idUsuarioB = '';
    let chatId = '';

    before(async () => {
        await request(app).post('/registro').send({
            nombre: 'Chat Usuario A',
            email: 'chatA@test.com',
            password: '123456'
        });
        await request(app).post('/registro').send({
            nombre: 'Chat Usuario B',
            email: 'chatB@test.com',
            password: '123456'
        });

        const resA = await request(app).post('/login').send({
            email: 'chatA@test.com',
            password: '123456'
        });
        tokenA = resA.body.token;

        const resB = await request(app).post('/login').send({
            email: 'chatB@test.com',
            password: '123456'
        });
        tokenB = resB.body.token;

        const usuarioA = await request(app)
            .get('/usuario/chatA@test.com')
            .set('Authorization', `Bearer ${tokenA}`);
        idUsuarioA = usuarioA.body._id;

        const usuarioB = await request(app)
            .get('/usuario/chatB@test.com')
            .set('Authorization', `Bearer ${tokenA}`);
        idUsuarioB = usuarioB.body._id;
    });

    it('debe crear un chat', async () => {
        const res = await request(app)
            .post('/chats')
            .set('Authorization', `Bearer ${tokenA}`)
            .send({
                participantes: [idUsuarioA, idUsuarioB],
                ultimoMensaje: '',
                fecha: new Date()
            });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
        expect(res.body.participantes).to.have.lengthOf(2);
        chatId = res.body._id;
    });

    it('no debe crear un chat duplicado', async () => {
        const res = await request(app)
            .post('/chats')
            .set('Authorization', `Bearer ${tokenA}`)
            .send({
                participantes: [idUsuarioA, idUsuarioB],
                ultimoMensaje: '',
                fecha: new Date()
            });
        expect(res.status).to.equal(201);
        expect(res.body._id).to.equal(chatId);
    });

    it('debe obtener los chats del usuario', async () => {
        const res = await request(app)
            .get(`/chats/todos/${idUsuarioA}`)
            .set('Authorization', `Bearer ${tokenA}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });

    it('no debe acceder sin token', async () => {
        const res = await request(app).get(`/chats/todos/${idUsuarioA}`);
        expect(res.status).to.equal(401);
    });
});