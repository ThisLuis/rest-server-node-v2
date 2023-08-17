const express = require('express');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// Middlewares
		this.middlewares();

		// Routes
		this.routes();
	}

	middlewares() {
		// public directory
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.get('/', (req, res) => {
			res.send('webserver start');
		})
	}

	listen() {
		this.app.listen( this.port, () => {
			console.log(`restserver running at port ${ this.port }`);
		})
	}
}

module.exports = Server;