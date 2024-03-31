const mongoose = require('mongoose')

const connectDB = (url , user , pass)=> {
    mongoose.connect(url,{
        authSource: "admin",
        user:user,
        pass:pass,
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }).then(()=> console.log('connected to DB'))
}

module.exports = connectDB