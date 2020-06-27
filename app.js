const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const DB = require('./middlewares/DB');
const httpLogger = require('./middlewares/httpLogger');
const userRoute = require('./routes/user');
const coopRoute = require('./routes/cooperative');

const app = express();

app.use(DB.connect);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(httpLogger);
app.use(bodyParser.json());

app.use('/files/cooperative/documents', express.static(path.join(__dirname, 'documents')));
app.use('/files/cooperative/images', express.static(path.join(__dirname, 'images')));
// app.use('/files/user-images', express.static(path.join(__dirname, 'images')));

// API Routes goes here
app.use('/auth', userRoute);
app.use('/coop', coopRoute);

module.exports = app;
