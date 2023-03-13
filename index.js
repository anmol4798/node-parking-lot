process.on('uncaughtException', (err) => {
	console.error('Unhandled Exception', err);
});
process.on('uncaughtRejection', (err) => {
	console.error('Unhandled Rejection', err);
});

global.appRoot = require('path').resolve(__dirname);

const container = require('./di'),
	server = require('./server');

server(container).then((app) => {
	console.log(
		`Server started succesfully, running on port - 4798`
	);
	app.on('close', () => {});
});