const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors'); // Import CORS middleware
require('dotenv').config();

connectToMongo();
const app = express();
const port = process.env.PORT;

// Enable CORS for all routes and for all methods (GET, POST, PUT, DELETE)
app.use(cors([{
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}]));

// Parse incoming JSON requests
app.use(express.json());

// Define routes
app.use('/api/student', require('./routes/student'));
app.use('/api/teacher', require('./routes/teacher'));
app.use('/api/college', require('./routes/college'));
app.use('/api/govt', require('./routes/goverment'));
app.use('/api/scholarships', require('./routes/scholarship'));
app.use('/api/courses', require('./routes/course'));


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
