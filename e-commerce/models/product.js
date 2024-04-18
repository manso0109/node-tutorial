const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"please provide a title"],
        },
        desc:{
            type:String,
            required:[true,"please provide a description"],
        },
        img: {type:String , required:[true,"please provide an image"],},
        categories: {type:Array},
        size:{type:String},
        color:{type:String},
        price:{type:String,required:[true,"please provide a price for the product"]},
    },{timestamps:true}
)
module.exports = mongoose.model("product" ,ProductSchema)