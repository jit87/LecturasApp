import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('Comentarios', () => {
    let token = '';
    let comentarioId = '';
    const idLibro = '6a6b33a8eaaf9bf6067fa946';

    before(async () => {
        await request(app).post('/registro').send({
            nombre: 'Test Comentarios',
            email: 'comentarios@test.com',
            password: '123456'
        });
        const res = await request(app).post('/login').send({
            email: 'comentarios@test.com',
            password: '123456'
        });
        token = res.body.token;
    });

    it('debe agregar un comentario', async () => {
        const res = await request(app)
            .post('/comentarios')
            .set('Authorization', `Bearer ${token}`)
            .send({
                _idLibro: idLibro,
                texto: 'Muy buen libro',
                fecha: new Date(),
                tipo: 'publico'
            });
        console.log(res.body);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('texto', 'Muy buen libro');
        comentarioId = res.body._id;
    });

    it('debe obtener los comentarios de un libro', async () => {
        const res = await request(app)
            .get(`/comentarios/todos/${idLibro}/publico`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('no debe acceder sin token', async () => {
        const res = await request(app)
            .get(`/comentarios/todos/${idLibro}/publico`);
        expect(res.status).to.equal(401);
    });

    it('debe eliminar un comentario', async () => {
        const res = await request(app)
            .delete(`/comentarios/${comentarioId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Comentario eliminado');
    });
});