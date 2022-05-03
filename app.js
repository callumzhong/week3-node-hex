'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const ErrorHandler = require('./service/errorHandler');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use((req, res, next) => {
	res.status(404).json({
		status: 404,
		message: '查無此網站路由',
	});
});
app.use(ErrorHandler);
module.exports = app;
