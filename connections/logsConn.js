const mongoose = require('mongoose');
const PASSWORD = process.env.PASSWORD || 'qaz123';
const DATABASE =
	process.env.DATABASE?.replace('<password>', PASSWORD) ||
	`mongodb+srv://albertnotes:${PASSWORD}@testdb1.nse0a.mongodb.net/logs?retryWrites=true&w=majority`;

const LogsConn = mongoose.createConnection(DATABASE);

module.exports = LogsConn;
