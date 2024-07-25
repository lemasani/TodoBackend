const express = require('express');
const todo = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { getTodos, postTodos, markTodo } = require('../middleware/todo.middleware');

todo.get('/', verifyToken, getTodos);
todo.post('/', verifyToken, postTodos);
todo.put('/', verifyToken, markTodo);

module.exports = todo;