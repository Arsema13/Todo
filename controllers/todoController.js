const TodoModel = require('../models/todoModel');

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required.',
      });
    }

    const newTodo = await TodoModel.create(userId, title, description || '');

    return res.status(201).json({
      success: true,
      message: 'Todo created successfully.',
      data: newTodo,
    });
  } catch (error) {
    console.error('Error in createTodo:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred.',
    });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await TodoModel.findAllByUser(userId);

    return res.status(200).json({
      success: true,
      message: 'Todos retrieved successfully.',
      data: todos,
    });
  } catch (error) {
    console.error('Error in getAllTodos:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred.',
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;

    const todo = await TodoModel.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found.',
      });
    }

    if (todo.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to access this todo.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Todo retrieved successfully.',
      data: todo,
    });
  } catch (error) {
    console.error('Error in getTodo:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred.',
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required.',
      });
    }

    const updatedTodo = await TodoModel.update(todoId, userId, title, description || '');

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found or you are not authorized to update it.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Todo updated successfully.',
      data: updatedTodo,
    });
  } catch (error) {
    console.error('Error in updateTodo:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred.',
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;

    const deletedTodo = await TodoModel.deleteById(todoId, userId);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found or you are not authorized to delete it.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully.',
      data: deletedTodo,
    });
  } catch (error) {
    console.error('Error in deleteTodo:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred.',
    });
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedTodos = await TodoModel.deleteAllByUser(userId);

    return res.status(200).json({
      success: true,
      message: `${deletedTodos.length} todo(s) deleted successfully.`,
      data: deletedTodos,
    });
  } catch (error) {
    console.error('Error in deleteAllTodos:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred.',
    });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
};
