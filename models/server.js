const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.paths = {
			auth:       '/api/auth',
			categories: '/apì/categories',
			users:      '/api/users',
		};

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
		this.app.use( this.paths.auth, require('../routes/auth.routes'));
		this.app.use( this.paths.categories, require('../routes/categories.routes'));
		this.app.use( this.paths.users, require('../routes/users.routes'));
	}

	listen() {
		this.app.listen( this.port, () => {
			console.log(`restserver running at port ${ this.port }`);
		})
	}
}

module.exports = Server;