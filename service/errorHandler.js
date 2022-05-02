const CustomizeError = require('../exception/customizeError');

const ErrorHandler = ({ res, error }) => {
	// mongoose models require error
	if (error.name === 'ValidationError') {
		for (key in error.errors) {
			error.errors[key] = error.errors[key].message;
		}
		res.status(400).json({
			status: 'ERROR',
			message: error.errors,
		});
		console.log(`errors: ${JSON.stringify(error.errors)}`);
		return;
	}
	if (error instanceof CustomizeError) {
		res.status(400).json({
			status: 'ERROR',
			message: error.message,
		});
		console.log(`errors: ${error.message}`);
		return;
	}
	if (error instanceof SyntaxError) {
		res.status(400).json({
			status: 'ERROR',
			message: 'JSON syntax error',
		});
		console.log(`syntax: ${error.message}`);
		return;
	}
	res.status(400).json({
		status: 'ERROR',
		message: error.message,
	});
	// heroku logs an error
	console.log(`alert: ${error.message}`);
};

module.exports = ErrorHandler;
