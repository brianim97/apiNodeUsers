const express = require('express');
const fileUpload = require('express-fileupload')
var cors = require('cors');
const dbConnection = require('../db/config');

class Server{
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usersPath = '';
        this.authPath = '';
        this.paths = {
            users:'/api/users',
            auth:'/api/auth',
            categories:'/api/categories',
            products:'/api/products',
            find:'/api/find',
            uploads:'/api/uploads',
        }

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
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes(){
        this.app.use(this.paths.users,require('../routes/user'));
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.categories,require('../routes/categories'));
        this.app.use(this.paths.products,require('../routes/products'));
        this.app.use(this.paths.find,require('../routes/find'));
        this.app.use(this.paths.uploads,require('../routes/uploads'));
    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log(`SERVER ON: http://localhost:${process.env.PORT}/`);
        });

    }

}

module.exports = Server;