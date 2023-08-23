const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usersRoutesPath = '/api/users';

		// Conectar a base de datos
		this.connectDB();
		
		// Middlewares
		this.middlewares();

		// Routes
		this.routes();
	}

	async connectDB() {
		await dbConnection();
	}

	middlewares() {

		// CORS
		this.app.use(cors());

		// Parseo y lectura json
		this.app.use(express.json());

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