const express = require('express');
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/create', createTodo);
router.get('/get_all', getAllTodos);
router.get('/get/:id', getTodo);
router.put('/update/:id', updateTodo);
router.delete('/delete/:id', deleteTodo);
router.delete('/delete_all', deleteAllTodos);

module.exports = router;
