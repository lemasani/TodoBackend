const express = require('express');
const todo = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { getTodos, postTodos, markTodo, deleteTodo, updateTodo } = require('../middleware/todo.middleware');

todo.get('/:id', verifyToken, getTodos);
todo.post('/', verifyToken, postTodos);
todo.put('/:id', verifyToken, markTodo);
todo.patch('/:id', verifyToken, updateTodo)
todo.delete('/:id', verifyToken, deleteTodo)

module.exports = todo;