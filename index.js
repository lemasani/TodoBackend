const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler')

const app = express();
app.use(express.json());

// Import routes
const register = require('./routes/userRoutes');
const login = require('./routes/userRoutes');


// Use routes   
app.use('/api/register', register);
app.use('/', login);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;


// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start listening only after MongoDB connection is successful
        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
});