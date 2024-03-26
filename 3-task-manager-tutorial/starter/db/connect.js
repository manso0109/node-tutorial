const mongoose = require('mongoose')

const connectDB = (url , user , pass)=> {
    mongoose.connect(url,{
        user:user,
        pass: pass
    }).then(()=> console.log('connected to DB'))
}

module.exports = connectDB

