'use strict'

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');

mongoose.connect('mongodb://admin:admin123@ds041188.mlab.com:41188/devradar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log('Rodando em 3000');
});