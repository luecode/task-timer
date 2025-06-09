let tasks = [];
let nextId = 1;

class Task {
  constructor(title, minutes) {
    this.id = nextId++;
    this.title = title;
    this.minutes = minutes;
    this.createdAt = new Date().toISOString();
  }
}

const TaskModel = {
  create(title, minutes) {
    const task = new Task(title, minutes);
    tasks.push(task);
    return task;
  },

  findAll() {
    return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  clear() {
    tasks = [];
    nextId = 1;
  }
};

module.exports = TaskModel;