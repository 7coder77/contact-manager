// filepath: d:\__Coding__\node\contact manager\index.js
const express = require('express');
const routes = require('./routes/index'); // Import the router
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandle');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/ani', routes); // Use the router directly
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});