const {response, request} = require('express')
const Categorie = require('../models/categorie')


const categorieGet = async(req = request , res = response)=>{
    const query = {status:true}

    const [total,categories] = await Promise.all([
        Categorie.countDocuments(query),
        Categorie.find(query)
        .populate('user','name')
    ])
    res.json({
        total,
        categories
    })
}
const categorieGetId = async(req = request , res = response)=>{
    const {id} = req.params;
    const categorie = await Categorie.findOne({
        _id:id,
        status:true,

    })
    res.json(categorie)
     
}
const categoriePost = async(req = request , res = response)=>{
    const name = req.body.name.toUpperCase();
    const user = req.user._id;
    
    const categorieDb = await Categorie.findOne({name})
    if(categorieDb){
        return res.status(400).json({msg:"Este nombre ya se encuentra en uso"})
    }
   
    const categorie = new Categorie({name,user})

    await categorie.save();

    res.json(categorie)
     
}
const categoriePut = async(req = request , res = response)=>{
    const {id} = req.params;
    const name = req.body.name.toUpperCase();
    const user = req.user._id;

    const categorieDb = await Categorie.findOne({name})
    if(categorieDb){
        return res.status(400).json({msg:"Este nombre ya se encuentra en uso"})
    }

    const categorie = await Categorie.findByIdAndUpdate(id,{name,user},{new:true})

    res.json(categorie)
     
}
const categorieDelete = async(req = request , res = response)=>{
    const {id} = req.params;

    const categorie = await Categorie.findByIdAndUpdate(id,{status:false})

    res.json(categorie)
     
}

module.exports = {
    categorieGet,
    categorieGetId,
    categoriePost,
    categoriePut,
    categorieDelete
}