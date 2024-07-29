const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// Configure CORS
app.use(cors({
    origin: process.env.ORIGN_URL, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Authorization,Content-Type'
}));

// Import routes
const register = require('./routes/userRoutes');
const login = require('./routes/userRoutes');
const todo = require('./routes/todoRouter');

// Use routes   
app.use('/api/register', register);
app.use('/', login);
app.use('/api/todos', todo); 

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
