require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const authRouter = require('./routes/auth.js')
const todoRouter = require('./routes/todos.js')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// estblishing connection to MongoDB
require('./setupMongo.js')();

app.use('/auth', authRouter)
app.use('/todo', todoRouter)

module.exports = app;
