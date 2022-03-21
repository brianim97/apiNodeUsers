const res = require('express/lib/response');
const Categorie = require('../models/categorie');
const Product = require('../models/product');
const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async(rol = '')=>{
    
         console.log('este es el rol'+rol);
    
        const existRol = await Role.findOne({rol});
        
        console.log(existRol);
        
        if(!existRol){
            throw new Error(`El rol ${rol} no esta registrado en la DB`)
        }
   
}

const existMail = async(mail='')=>{

      //Verifiar si el usuario existe
      const mailExist =  await User.findOne({mail});
      if(mailExist){
          throw new Error(`El mail ${mail} ya esta registrado`)
      }
}

const exisUserForID = async(id)=>{

      //Verifiar si el id existe
      const userExist =  await User.findById(id);
      if(!userExist){
          throw new Error(`El id ${id} no existe`)
      }
}
const existCategorieForID = async(id)=>{

    //Verifiar si el id existe
    const categorieExist =  await Categorie.findById(id);
    if(!categorieExist){
        throw new Error(`El id ${id} no existe`)
    }
}
const existProductForID = async(id)=>{

    //Verifiar si el id existe
    const productExist =  await Product.findById(id);
    if(!productExist){
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    isValidRole,
    existMail,
    exisUserForID,
    existCategorieForID,
    existProductForID
}