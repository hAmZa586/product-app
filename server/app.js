const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/index')
const cors = require('cors')

// Create an Express application
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cors())
app.use(productRoutes)

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Inventory', {
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
