const express = require('express');
const todo = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { getTodos, postTodos, markTodo, deleteTodo } = require('../middleware/todo.middleware');

todo.get('/:id', verifyToken, getTodos);
todo.post('/', verifyToken, postTodos);
todo.put('/', verifyToken, markTodo);
todo.delete('/:id', verifyToken, deleteTodo)

module.exports = todo;