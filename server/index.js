const express = require('express');
const app = express();
const port = 3001;
const router = require('./router/auth-router'); // importing router
const connectDB = require('./utils/db'); // importing connectDB
const cors = require('cors'); // importing cors

// Tackling the CORS
app.use(cors({
    origin: 'http://localhost:5173', // Update this to match your actual frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Using the router
app.use('/api/auth', router);

// Handling preflight requests
app.options('/api/auth/*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send();
});

// Listening only if the database is connected
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
