const { expect } = require('chai');
const TaskModel = require('../models/task');

describe('TaskModel', () => {
  beforeEach(() => {
    // Limpiar datos antes de cada test
    TaskModel.clear();
  });

  describe('create()', () => {
    it('debería crear una tarea con ID autoincremental', () => {
      const task1 = TaskModel.create('Primera tarea', 25);
      const task2 = TaskModel.create('Segunda tarea', 30);

      expect(task1.id).to.equal(1);
      expect(task2.id).to.equal(2);
    });

    it('debería crear una tarea con los datos correctos', () => {
      const task = TaskModel.create('Tarea de prueba', 45);

      expect(task.title).to.equal('Tarea de prueba');
      expect(task.minutes).to.equal(45);
      expect(task.createdAt).to.be.a('string');
      expect(new Date(task.createdAt)).to.be.a('date');
    });

    it('debería generar createdAt como string ISO', () => {
      const task = TaskModel.create('Test', 10);
      const date = new Date(task.createdAt);

      expect(date.toISOString()).to.equal(task.createdAt);
    });
  });

  describe('findAll()', () => {
    it('debería retornar array vacío cuando no hay tareas', () => {
      const tasks = TaskModel.findAll();
      expect(tasks).to.be.an('array');
      expect(tasks).to.have.length(0);
    });

    it('debería retornar todas las tareas creadas', () => {
      TaskModel.create('Tarea 1', 15);
      TaskModel.create('Tarea 2', 20);
      TaskModel.create('Tarea 3', 25);

      const tasks = TaskModel.findAll();
      expect(tasks).to.have.length(3);
    });

    it('debería ordenar tareas por createdAt descendente', (done) => {
      // Crear tareas secuencialmente
      const task1 = TaskModel.create('Primera', 10);

      // Pequeño delay para asegurar orden temporal
      setTimeout(() => {
        const task2 = TaskModel.create('Segunda', 20);
        const task3 = TaskModel.create('Tercera', 30);

        const tasks = TaskModel.findAll();

        expect(tasks[0].id).to.equal(task3.id); // Más reciente primero
        expect(tasks[1].id).to.equal(task2.id);
        expect(tasks[2].id).to.equal(task1.id); // Más antigua al final

        done(); // Importante: llamar done() al final
      }, 10);
    });
  });

  describe('clear()', () => {
    it('debería limpiar todas las tareas y resetear ID', () => {
      TaskModel.create('Tarea 1', 15);
      TaskModel.create('Tarea 2', 20);

      TaskModel.clear();

      const tasks = TaskModel.findAll();
      expect(tasks).to.have.length(0);

      // Verificar que el ID se resetea
      const newTask = TaskModel.create('Nueva tarea', 10);
      expect(newTask.id).to.equal(1);
    });
  });
});