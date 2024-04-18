const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"please provide a username"],
            unique:true,
        },
        email:{
            type:String,
            required:[true,"please provide an email"],
            unique:true,
        },
        password:{
            type:String,
            required:[true,"please provide a password"],
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
    },{timestamps:true}
)
module.exports = mongoose.model("user" ,UserSchema)