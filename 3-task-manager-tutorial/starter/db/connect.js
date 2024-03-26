const mongoose = require('mongoose')

const connectDB = (url , user , pass)=> {
    mongoose.connect(url,{
        user:user,
        pass: pass
    })
}

module.exports = connectDB

