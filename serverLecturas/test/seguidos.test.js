import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('Seguidos', () => {
    let tokenA = '';
    let tokenB = '';
    let idUsuarioB = '';

    before(async () => {
        //Creamos dos usuarios para probar el follow/unfollow
        await request(app).post('/registro').send({
            nombre: 'Usuario A',
            email: 'usuarioA@test.com',
            password: '123456'
        });
        await request(app).post('/registro').send({
            nombre: 'Usuario B',
            email: 'usuarioB@test.com',
            password: '123456'
        });

        const resA = await request(app).post('/login').send({
            email: 'usuarioA@test.com',
            password: '123456'
        });
        tokenA = resA.body.token;

        const resB = await request(app).post('/login').send({
            email: 'usuarioB@test.com',
            password: '123456'
        });
        tokenB = resB.body.token;

        //Obtenemos el id de B
        const usuarioB = await request(app)
            .get('/usuario/usuarioB@test.com')
            .set('Authorization', `Bearer ${tokenA}`);
        idUsuarioB = usuarioB.body._id;
    });

    it('debe seguir a un usuario', async () => {
        const res = await request(app)
            .post('/seguidos')
            .set('Authorization', `Bearer ${tokenA}`)
            .send({ idSeguido: idUsuarioB });
        expect(res.status).to.equal(200);
        expect(res.body.seguidos).to.include(idUsuarioB);
    });

    it('debe obtener los seguidos del usuario', async () => {
        const res = await request(app)
            .get('/seguidos/todos')
            .set('Authorization', `Bearer ${tokenA}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.map((id) => id.toString())).to.include(idUsuarioB);
    });

    it('debe obtener los seguidores del usuario B', async () => {
        const res = await request(app)
            .get('/seguidos/seguidores')
            .set('Authorization', `Bearer ${tokenB}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('debe obtener seguidos por id', async () => {
        const res = await request(app)
            .get(`/seguidos/seguidos/${idUsuarioB}`)
            .set('Authorization', `Bearer ${tokenA}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('debe obtener seguidores por id', async () => {
        const res = await request(app)
            .get(`/seguidos/seguidores/${idUsuarioB}`)
            .set('Authorization', `Bearer ${tokenA}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('no debe acceder sin token', async () => {
        const res = await request(app).get('/seguidos/todos');
        expect(res.status).to.equal(401);
    });

    it('debe dejar de seguir a un usuario', async () => {
        const res = await request(app)
            .delete(`/seguidos/${idUsuarioB}`)
            .set('Authorization', `Bearer ${tokenA}`);
        expect(res.status).to.equal(200);
    });
});