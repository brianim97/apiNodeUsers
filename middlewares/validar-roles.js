const { response } = require("express")

const isAdminRol = (req, res=response, next)=>{
    
    if(!req.user){
        return res.status(500).json({
            msg:"Se quiere verificar el rol sin validar el token primero"
        })
    }

    const {rol, name} = req.user;

    if(rol !== 'ADMIN'){
        return res.status(401).json({
            msg:`${name} no es administrador`
        })
    }

    next();
}

const haveRol = (...roles)=>{
    return (req, res=response, next)=>{
        
        if(!req.user){
            return res.status(500).json({
                msg:"Se quiere verificar el rol sin validar el token primero"
            })
        }

        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                msg:`El sistema requiere uno de estos roles: ${roles}`
            })
        }
        next();        
    }
}

module.exports = {
    haveRol,
    isAdminRol
}