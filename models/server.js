const express = require('express');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usersRoutesPath = '/api/users';

		// Middlewares
		this.middlewares();

		// Routes
		this.routes();
	}

	middlewares() {

		// CORS
		this.app.use(	cors());
		// public directory
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use( this.usersRoutesPath, require('../routes/users.routes'));
	}

	listen() {
		this.app.listen( this.port, () => {
			console.log(`restserver running at port ${ this.port }`);
		})
	}
}

module.exports = Server;