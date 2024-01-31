require('dotenv').config();
const express = require('express');
const cors = require('cors');

// App init
const app = express();

// Middlewares
app.use([
    cors(),
    express.json(),
    express.urlencoded({ extended: false })
]);

// Routes
app.use('/', require('./src/routes'));

// Error-handling middleware
app.use((err, req, res, next) => {

    console.error(err);

    if (!res.headersSent) {

        res.status(500).send('Internal Server Error');

    };
    
});

// Server port
const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

module.exports = { app, server };