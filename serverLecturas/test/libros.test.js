import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';


describe('Libros', () => {
    let token = '';
    let libroId = '';

    before(async () => {
        //Registramos un usuario y obtenemos el token
        await request(app).post('/registro').send({
            nombre: 'Test Libros',
            email: 'libros@test.com',
            password: '123456'
        });
        const res = await request(app).post('/login').send({
            email: 'libros@test.com',
            password: '123456'
        });
        token = res.body.token;
    });

    it('debe agregar un libro', async () => {
        const res = await request(app)
            .post('/libros')
            .set('Authorization', `Bearer ${token}`)
            .send({
                titulo: 'El Quijote',
                autores: ['Cervantes'],
                estado: 'Leyendo',
                APIid: '123',
                categorias: 'Ficción'
            });
        console.log(res.body);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
        libroId = res.body._id;
    });

    it('debe obtener los libros del usuario', async () => {
        const res = await request(app)
            .get('/libros/todos/id')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('debe obtener un libro por id', async () => {
        const res = await request(app)
            .get(`/libros/libro/${libroId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('titulo', 'El Quijote');
    });

    it('debe actualizar un libro', async () => {
        const res = await request(app)
            .put(`/libros/${libroId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ estado: 'Leído' });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('estado', 'Leído');
    });

    it('debe obtener libros por APIid', async () => {
        const res = await request(app)
            .get('/libros/APIid/123')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('encontrado', true);
    });

    it('debe obtener todos los libros para social', async () => {
        const res = await request(app)
            .get('/libros/todos')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('debe obtener libros leídos', async () => {
        const res = await request(app)
            .get('/libros/leidos/id')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
    });

    it('no debe acceder sin token', async () => {
        const res = await request(app).get('/libros/todos');
        expect(res.status).to.equal(401);
    });

    it('debe eliminar un libro', async () => {
        const res = await request(app)
            .delete(`/libros/${libroId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Libro eliminada');
    });
});