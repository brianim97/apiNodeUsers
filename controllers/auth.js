const bcrypt = require("bcryptjs/dist/bcrypt")
const { response } = require("express")
const { createJwt } = require("../helpers/createJwt")
const { googleVerify } = require("../helpers/google-verify")
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
            msg:`Error: ${error}`
        })
    }
}
const googleSignIn = async(req,res = response)=>{
    const {id_token} = req.body;

    try {
        const {name, img, mail} = await googleVerify(id_token);

        console.log(name,img,mail);
        
        
        let user = await User.findOne({mail});

        if(!user){
            // Hay que crearlo
            const data = {
                name,
                mail,
                password: ':P',
                rol:'REGULAR',
                img,
                google:true
            }
            user = new User(data);
            await user.save();
        }

        // Si el usuario en db
        if(!user.status){
            return res.status(401).json({
                msg:"Hable con el administrador, user bloqueado"
            })
        }

        //Generar JWT
        const token = await createJwt(user.id);


        res.json({
           user,
           token
        })
        
    } catch (error) {
        res.status(400).json({
            error,
            ok:false,
            msg:"El token no se pudo verificar"
        })
    }

}

module.exports = {
    login,
    googleSignIn
};