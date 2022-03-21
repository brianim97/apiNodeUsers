const {Schema,model} = require('mongoose');

const ProductSchema = Schema({
    name:{
        type:String,
        required:true,
        unique:true,
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
    },
    price:{
        type:Number,
        default:0,
    },
    categorie:{
        type:Schema.Types.ObjectId,
        ref:"Categorie",
        required:true
    },
    description:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    },
    img:{
        type:String,
        default:'https://iwosa.com/wp-content/plugins/marketpress/ui/images/default-product.png'
    }

})
ProductSchema.methods.toJSON = function(){
    const {__v, status, ...product} = this.toObject();
    return product;
}
module.exports = model('Product',ProductSchema);