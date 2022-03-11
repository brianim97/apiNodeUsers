const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validarJwt = async(req, res = response, next)=>{
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg:"No hay toquen de autorizacion"
        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)

        //leer el usuario que corresponde al uid
        const user = await User.findById(uid);

        req.user = user;
        next();
    } catch (error) {
        
    }

    
}

module.exports = {
    validarJwt
}