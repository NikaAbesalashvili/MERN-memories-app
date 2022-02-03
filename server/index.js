const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const connectDB = require('./database/connect');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Setting up routes
app.use('/api/v1/', postRoutes);
app.use('/api/v1/', userRoutes);

const CONNECTION_STRING = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Starting Server
const start = async () => {
    try {
        await connectDB(CONNECTION_STRING);

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    };
};

start();
