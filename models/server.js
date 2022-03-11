const express = require('express');
var cors = require('cors');
const dbConnection = require('../db/config');

class Server{
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        //Conexion a la base de datos
        this.conectarDB();

        //Middlewares

        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());
        this.middlewares();

        //Rutas de mi aplicacion

        this.routes();

    }

    async conectarDB(){
        await dbConnection(); 
    }

    middlewares(){
        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usersPath,require('../routes/user'));
        this.app.use(this.authPath,require('../routes/auth'));
    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log(`SERVER ON: http://localhost:3000/`);
        });

    }

}

module.exports = Server;