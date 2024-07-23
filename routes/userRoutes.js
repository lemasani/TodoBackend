const express = require('express');

const router = express.Router();
// Import middleware
const { loginUser, registerUser } = require('../middleware/user.middleware');

// User registration route
router.post('/', registerUser);

// User login route
router.post('/login', loginUser);

module.exports = router;