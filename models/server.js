const express = require('express');
const cors = require('cors');
const fileUpload = require ('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.paths = {
			auth:       '/api/auth',
			categories: '/api/categories',
			products:   '/api/products',
			search:     '/api/search',
			uploads:    '/api/uploads',
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

		// fileUpload
		this.app.use( fileUpload({
			useTempFiles: true,
			temoFileDir : '/tmp/'
		}))
	}

	routes() {
		this.app.use( this.paths.auth, require('../routes/auth.routes'));
		this.app.use( this.paths.categories, require('../routes/categories.routes'));
		this.app.use( this.paths.products, require('../routes/products.routes'));
		this.app.use( this.paths.search, require('../routes/search.routes'));
		this.app.use( this.paths.uploads, require('../routes/upload.routes'));
		this.app.use( this.paths.users, require('../routes/users.routes'));
	}

	listen() {
		this.app.listen( this.port, () => {
			console.log(`restserver running at port ${ this.port }`);
		})
	}
}

module.exports = Server;