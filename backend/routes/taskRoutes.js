const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { title, description, category, dueDate, priority, status } = req.body;

    if (!title || !dueDate) {
      res.status(400);
      throw new Error('Please provide title and dueDate fields');
    }

    const task = await Task.create({
      title,
      description,
      category: category || 'Work',
      dueDate,
      priority: priority || 'Medium',
      status: status || 'Pending',
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// @desc    Get all tasks with filtering, sorting, and searching
// @route   GET /api/tasks
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { status, priority, category, search, sortBy, order } = req.query;
    
    // Build query object
    let query = {};

    // 1. Filtering
    if (status) {
      query.status = status;
    }
    if (priority) {
      query.priority = priority;
    }
    if (category) {
      query.category = { $regex: new RegExp('^' + category + '$', 'i') }; // case-insensitive exact match
    }

    // 2. Searching (Title or Category)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query
    let tasks = await Task.find(query);

    // 3. Sorting
    // Since MongoDB doesn't natively sort Priority in custom 'High' -> 'Medium' -> 'Low' ordering,
    // we'll perform the sorting in JavaScript for maximum flexibility.
    const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
    
    tasks.sort((a, b) => {
      let comparison = 0;
      const isAsc = order === 'asc';

      if (sortBy === 'dueDate') {
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'oldest') {
        comparison = new Date(a.createdDate) - new Date(b.createdDate);
      } else if (sortBy === 'newest') {
        comparison = new Date(b.createdDate) - new Date(a.createdDate);
      } else if (sortBy === 'priority') {
        comparison = priorityWeight[b.priority] - priorityWeight[a.priority]; // Default: high priority first
      } else {
        // Default sort: newest first
        comparison = new Date(b.createdDate) - new Date(a.createdDate);
      }

      return isAsc ? -comparison : comparison;
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// @desc    Update a task (CRUD & Mark Complete)
// @route   PUT /api/tasks/:id
// @access  Public
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, category, dueDate, priority, status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.category = category !== undefined ? category : task.category;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
    task.priority = priority !== undefined ? priority : task.priority;
    task.status = status !== undefined ? status : task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
