const bcrypt = require("bcryptjs/dist/bcrypt")
const { response } = require("express")
const { createJwt } = require("../helpers/createJwt")
const User = require("../models/user")

const login = async(req, res = response)=>{

    const {mail,password} = req.body

    try {
       

        //Verificar si el mail existe
        const user = await User.findOne({mail})  

        if(!user){
            return res.status(400).json({
                msg:"Mail o Contraseña no son correctos - mail"
            })
        }

        //Si el usuario esta activo
        if(!user.status){
            return res.status(400).json({
                msg:"Usuario deshabilitado"
            })
        }

        
        //Verificar la contraseña 
       const passwordVerify = bcrypt.compareSync(password, user.password) 
       if(!passwordVerify){
        return res.status(400).json({
            msg:"Mail o Contraseña no son correctos - pass"
        })
    }
        //Generar el JWT
        const token = await createJwt(user.id);




        res.json({
            user,
           token
        })
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            msg:"Error comuniquese con el administrador del sitio"
        })
    }
}

module.exports = {login};