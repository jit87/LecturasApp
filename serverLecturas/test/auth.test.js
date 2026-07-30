import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

let token = '';

describe('Auth - Registro', () => {
    it('debe registrar un usuario nuevo', async () => {
        const res = await request(app).post('/registro').send({
            nombre: 'Test User',
            email: 'test@test.com',
            password: '123456'
        });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('user');
    });

    it('no debe registrar un email duplicado', async () => {
        const res = await request(app).post('/registro').send({
            nombre: 'Test User',
            email: 'test@test.com',
            password: '123456'
        });
        expect(res.status).to.equal(400);
    });
});

describe('Auth - Login', () => {
    it('debe hacer login correctamente', async () => {
        const res = await request(app).post('/login').send({
            email: 'test@test.com',
            password: '123456'
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
    });

    it('no debe hacer login con contraseña incorrecta', async () => {
        const res = await request(app).post('/login').send({
            email: 'test@test.com',
            password: 'wrongpassword'
        });
        expect(res.status).to.equal(400);
    });

    it('no debe hacer login con email inexistente', async () => {
        const res = await request(app).post('/login').send({
            email: 'noexiste@test.com',
            password: '123456'
        });
        expect(res.status).to.equal(400);
    });
});

describe('Auth - Rutas protegidas', () => {
    before(async () => {
        //Obtenemos el token del usuario
        const res = await request(app).post('/login').send({
            email: 'test@test.com',
            password: '123456'
        });
        token = res.body.token;
    });

    it('debe obtener usuario por email', async () => {
        const res = await request(app)
            .get('/usuario/test@test.com')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('email', 'test@test.com');
        expect(res.body).to.not.have.property('password');
    });

    it('debe modificar el nombre', async () => {
        const res = await request(app)
            .put('/modificar-nombre')
            .set('Authorization', `Bearer ${token}`)
            .send({ nuevoNombre: 'Nombre Modificado' });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('nuevoNombre', 'Nombre Modificado');
    });

    it('debe modificar el email', async () => {
        const res = await request(app)
            .put('/modificar-email')
            .set('Authorization', `Bearer ${token}`)
            .send({ nuevoEmail: 'modified@test.es' });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('nuevoEmail', 'modified@test.es');
    });

    it('debe modificar la contraseña', async () => {
        const res = await request(app)
            .put('/modificar-pass')
            .set('Authorization', `Bearer ${token}`)
            .send({ actualPassword: '123456', nuevaPassword: '453612' });
        expect(res.status).to.equal(200);
    });

    it('no debe acceder a ruta protegida sin token', async () => {
        const res = await request(app)
            .put('/modificar-nombre')
            .send({ nuevoNombre: 'Intruso' });
        expect(res.status).to.equal(401);
    });

    it('debe eliminar el usuario', async () => {
        const res = await request(app)
            .delete('/eliminar-usuario/id')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('resultado', 'Eliminado usuario');
    });

});