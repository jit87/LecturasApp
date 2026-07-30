import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('Colecciones', () => {
    let token = '';

    before(async () => {
        await request(app).post('/registro').send({
            nombre: 'Test Colecciones',
            email: 'colecciones@test.com',
            password: '123456'
        });
        const res = await request(app).post('/login').send({
            email: 'colecciones@test.com',
            password: '123456'
        });
        token = res.body.token;
    });

    it('debe agregar una colección', async () => {
        const res = await request(app)
            .post('/colecciones')
            .set('Authorization', `Bearer ${token}`)
            .send({ coleccion: 'Literatura inglesa' });
        expect(res.status).to.equal(200);
        expect(res.body.colecciones).to.include('Literatura inglesa');
    });

    it('debe obtener las colecciones del usuario', async () => {
        const res = await request(app)
            .get('/colecciones/todas/id')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.include('Literatura inglesa');
    });

    it('debe eliminar una colección', async () => {
        const res = await request(app)
            .delete('/colecciones/0')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Colección eliminada');
    });

    it('no debe acceder sin token', async () => {
        const res = await request(app).get('/colecciones/todas/id');
        expect(res.status).to.equal(401);
    });
});