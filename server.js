const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyparser = require('body-parser');
const cors = require('cors');
const router = require('./api/router.js');

const server = container => {

	return new Promise((resolve, reject) => {
		const app = express();
		app.use(morgan('dev'));
		app.use(bodyparser.urlencoded({
			extended: true
		}));
		app.use(bodyparser.json({
			limit: '10mb',
			strict: false
		}));
		app.use(cors());
		app.use(helmet());
		app.use((err, req, res, next) => {
			return res.status(500).send(`Something went wrong!, err:${err}`);
		});
		app.use((req, res, next) => {
			req.container = container.createScope();
			next();
		});
		app.get('/', (req, res) => {
			return res.send('Hello from Vendor user service!');
		});
		app.use('/vendor-user-service', router);

		const server = app.listen(4798, () => {
			server.keepAliveTimeout = 120000;
			return resolve(server);
		});
	});
};

module.exports = server;