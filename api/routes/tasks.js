const express = require('express');
const Joi = require('joi');
const TaskModel = require('../models/task');

const router = express.Router();

// Validation schema
const taskSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  minutes: Joi.number().integer().min(1).max(120).required()
});

// POST /tasks - Create a new task
router.post('/', (req, res, next) => {
  try {
    const { error, value } = taskSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details[0].message
      });
    }

    const { title, minutes } = value;
    const task = TaskModel.create(title, minutes);

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// GET /tasks - Get all tasks
router.get('/', (req, res, next) => {
  try {
    const tasks = TaskModel.findAll();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

module.exports = router;