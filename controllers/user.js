const {response, request} = require('express')
const User = require('../models/user')

const bcryptjs = require('bcryptjs')

const usersGet = async(req = request,res = response)=>{
    const {limit = 5, desde = 0} = req.query;
    const query = {status:true};

    const [users, total] = await Promise.all([
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limit)),

        User.countDocuments(query)

    ])

    res.json({
       total,
       users
    })
}
const usersPost = async(req,res = response)=>{

   //devolver error en caso de que alguna validacion falle

    const {name, mail, password, google, rol} = req.body;
    const user = new User({name, mail, password, google, rol});

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await user.save();
    res.json({
        user
    })
}
const usersPut = async(req,res = response)=>{

    const id = req.params.id;
    const {_id, password, google,mail , ...resto} = req.body;

    //TODO validar contra base de datos
    if(password){
          //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const userDB = await User.findByIdAndUpdate(id, resto)

    res.json(userDB)
}


const usersDelete = async(req,res= response)=>{
    const {id} = req.params;

    //Borrado fisicamente
    // const user = await User.findByIdAndDelete(id)

    const user = await User.findByIdAndUpdate(id, {status:false})


    res.json({
        user
    })
}

const usersPatch = (req,res = response)=>{
    res.json({
        action:"patch"
    })
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}