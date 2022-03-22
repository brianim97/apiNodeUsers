const {request, response} = require('express');
const Categorie = require('../models/categorie');
const Product = require('../models/product');
const User = require('../models/user');
const {ObjectId} = require('mongoose').Types;
const colections = [
    'users',
    'categories',
    'products',
    'rols'
]

const findUsers = async(term = '', res = response)=>{
    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const user = await User.findById(term)
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(term, 'i');
    const users  = await User.find({
        $or:[{name:regex},{mail:regex}],
        $and:[{status:true}]
    })


    res.json({
        results:users
    })
    
}
const findCategorie = async(term = '', res=response)=>{
    
    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const categorie = await Categorie.findOne({id:term,status:true})
        return res.json({
            results: (categorie) ? [categorie] : []
        })
    }
    const regex = new RegExp(term, 'i');
    const categories  = await Categorie.find({name:regex,status:true})


    res.json({
        results:categories
    })

    
}
const findProduct = async(term = '', res = response)=>{
    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const product = await Product.findOne({name:term,status:true}).populate('categorie','name')
        return res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = new RegExp(term, 'i');
    const products  = await Product.find({name:regex,status:true}).populate('categorie','name')


    res.json({
        results:products
    })
    
}

const find = (req= request, res = response)=>{

    const { colection, term } = req.params

    if(!colections.includes(colection)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son ${colections}`
        })
    }

    switch (colection){
        case 'users':
            findUsers(term,res)
            break;
        case'categories':
            findCategorie(term,res)
            break;
        case 'products':
            findProduct(term,res)
            break;
        default:
            res.status(500).json({
                msg:'La busqueda no puede realizarse'
            })
    }
}

module.exports = {find}