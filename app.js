require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const memberRoutes = require('./routes/memberRoute');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const dbConnectionString = process.env.DB_CONNECTION_STRING;

// Mongoose connection
mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas!');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Stop appen, hvis der er fejl
});

// Set EJS as view-engine
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', memberRoutes);

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
