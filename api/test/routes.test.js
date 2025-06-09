const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const tasksRouter = require('../routes/tasks');
const TaskModel = require('../models/task');

// Configurar app de prueba
const app = express();
app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);

describe('Tasks API Routes', () => {
  beforeEach(() => {
    TaskModel.clear();
  });

  describe('POST /tasks', () => {
    it('debería crear una tarea válida y retornar 201', async () => {
      const taskData = {
        title: 'Tarea de prueba',
        minutes: 25
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body).to.have.property('id');
      expect(response.body.title).to.equal(taskData.title);
      expect(response.body.minutes).to.equal(taskData.minutes);
      expect(response.body).to.have.property('createdAt');
    });

    it('debería rechazar tarea con título vacío', async () => {
      const taskData = {
        title: '',
        minutes: 25
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('Validation error');
    });

    it('debería rechazar tarea con título solo espacios', async () => {
      const taskData = {
        title: '   ',
        minutes: 25
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body).to.have.property('error');
    });

    it('debería rechazar minutes menor a 1', async () => {
      const taskData = {
        title: 'Tarea válida',
        minutes: 0
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.error).to.equal('Validation error');
    });

    it('debería rechazar minutes mayor a 120', async () => {
      const taskData = {
        title: 'Tarea válida',
        minutes: 121
      };

      const response = await request(app)
        .post('/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.error).to.equal('Validation error');
    });

    it('debería aceptar minutes en los límites válidos', async () => {
      // Probar límite inferior
      await request(app)
        .post('/tasks')
        .send({ title: 'Min test', minutes: 1 })
        .expect(201);

      // Probar límite superior
      await request(app)
        .post('/tasks')
        .send({ title: 'Max test', minutes: 120 })
        .expect(201);
    });

    it('debería rechazar datos faltantes', async () => {
      await request(app)
        .post('/tasks')
        .send({ title: 'Solo título' })
        .expect(400);

      await request(app)
        .post('/tasks')
        .send({ minutes: 25 })
        .expect(400);
    });
  });

  describe('GET /tasks', () => {
    it('debería retornar array vacío cuando no hay tareas', async () => {
      const response = await request(app)
        .get('/tasks')
        .expect(200);

      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(0);
    });

    it('debería retornar todas las tareas creadas', async () => {
      // Crear algunas tareas
      await request(app)
        .post('/tasks')
        .send({ title: 'Tarea 1', minutes: 15 });

      await request(app)
        .post('/tasks')
        .send({ title: 'Tarea 2', minutes: 30 });

      const response = await request(app)
        .get('/tasks')
        .expect(200);

      expect(response.body).to.have.length(2);
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('title');
      expect(response.body[0]).to.have.property('minutes');
      expect(response.body[0]).to.have.property('createdAt');
    });

    it('debería retornar tareas ordenadas por createdAt descendente', async () => {
      // Crear tareas en secuencia
      const task1 = await request(app)
        .post('/tasks')
        .send({ title: 'Primera tarea', minutes: 10 });

      const task2 = await request(app)
        .post('/tasks')
        .send({ title: 'Segunda tarea', minutes: 20 });

      const response = await request(app)
        .get('/tasks')
        .expect(200);

      // La más reciente debería estar primero
      expect(response.body[0].id).to.equal(task2.body.id);
      expect(response.body[1].id).to.equal(task1.body.id);
    });
  });
});