const {response, request} = require('express')
const Product = require('../models/product')


const productGet = async(req = request , res = response)=>{
    const query = {status:true}

    const [total,products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user','name')
        .populate('categorie','name')
    ])
    res.json({
        total,
        products
    })
}
const productGetId = async(req = request , res = response)=>{
    const {id} = req.params;
    const product = await Product.findOne({
        _id:id,
        status:true,

    })
    res.json(product)
     
}
const productPost = async(req = request , res = response)=>{
    const name = req.body.name.toUpperCase();
    const user = req.user._id;
    const {categorie} = req.body
    
    const productDb = await Product.findOne({name})
    if(productDb){
        return res.status(400).json({msg:"Este nombre ya se encuentra en uso"})
    }
   
    const product = new Product({name,user,categorie})

    await product.save();

    res.json(product)
     
}
const productPut = async(req = request , res = response)=>{
    const {id} = req.params;
    const name = req.body.name.toUpperCase();
    const user = req.user._id;
    const {categorie} = req.body

    const {name:nameOrigin} = await Product.findById(id);
    if(nameOrigin != name){
        const productDb = await Product.findOne({name})
        if(productDb){
            return res.status(400).json({msg:"Este nombre ya se encuentra en uso"})
        }
    }
    const product = await Product.findByIdAndUpdate(id,{name,user,categorie},{new:true})

    res.json(product)
     
}
const productDelete = async(req = request , res = response)=>{
    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id,{status:false})

    res.json(product)
     
}

module.exports = {
    productGet,
    productGetId,
    productPost,
    productPut,
    productDelete
}