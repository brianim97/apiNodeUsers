const jwt = require('jsonwebtoken')

const createJwt = (uid = '')=>{
    return new Promise((res, rej)=>{
        const payload = {uid};
        
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:"1h"
        },(err, token)=>{
            if(err){
                console.log(err);
                rej('No se puedo generar el token')
            }else{
                res(token)
            }
        })
    })
}

module.exports = {createJwt}