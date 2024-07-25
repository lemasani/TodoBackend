const Todo = require('../model/TodoModel');

exports.getTodos = async (req, res) => {
	try {
		const todos = await Todo.find({ user: req.user._id });
		res.json(todos);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching todos', error: error.message });
	}
};

exports.postTodos = async (req, res) => {
	try {
		const { title, description, dueDate } = req.body;
		const todo = new Todo({
			user: req.user._id,
			title,
			description,
			dueDate
		});
		await todo.save();
		res.status(201).json(todo);
	} catch (error) {
		res.status(400).json({ message: 'Error creating todo', error: error.message });
	}
};

exports.markTodo = async (req, res) => {
    try {
        const { id, status } = req.body;
        const todo = await Todo.findByIdAndUpdate(id, { status }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
	try {
	  const { id } = req.params;
	  const todo = await Todo.findByIdAndUpdate(id, { deleted: true }, { new: true });
	  if (!todo) {
		return res.status(404).json({ message: 'Todo not found' });
	  }
	  res.json({ message: 'Todo deleted successfully' });
	} catch (error) {
	  res.status(500).json({ message: 'Error deleting todo', error: error.message });
	}
  };