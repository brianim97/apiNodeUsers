const {Schema,model} = require('mongoose');

const CategorieSchema = Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports = model('Categorie',CategorieSchema);