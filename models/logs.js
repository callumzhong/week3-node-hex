const mongoose = require('mongoose');
const LogsConn = require('../connections/logsConn');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
const logSchema = new mongoose.Schema(
	{
		url: {
			type: String,
			required: true,
			cast: false,
		},
		type: {
			type: String,
			required: true,
			cast: false,
		},
		method: {
			type: String,
			required: true,
			cast: false,
		},
		message: {
			type: String,
			required: true,
			cast: false,
		},
		createdAtTW: {
			type: String,
			default: () => dayjs(Date.now()).tz('Asia/Taipei').format(),
		},
	},
	{
		versionKey: false,
	},
);
const Log = LogsConn.model('Logs', logSchema);

module.exports = Log;
