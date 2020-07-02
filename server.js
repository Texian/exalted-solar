//----------------------------------------------------- SETUP -----------------------------------------------------//
const express = require ('express');
const app = express();
const PORT = process.env.PORT || 4000;
const path = require('path');
const db = require('./models');

require('dotenv').config();

//----------------------------------------------------- MIDDLEWARE -----------------------------------------------------//
app.use(express.json());

const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    operationsSuccessStatus: 200
}
app.use(cors(corsOptions));

//----------------------------------------------------- ROUTES -----------------------------------------------------//
const routes = require('./routes');

//--------------------- API List
app.use('/api/v1', routes.auth);
app.use('/api/v1', routes.api);
app.get('/', (req, res) => {
    res.send('Praise the UCS');
});

//----------------------------------------------------- START SERVER -----------------------------------------------------//
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));