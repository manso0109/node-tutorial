const mongoose = require('mongoose')

const connectDB = (url , user , pass)=> {
    mongoose.connect(url,{
        authSource: "admin",
        user:user,
        pass:pass,
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }).then(function () {
        return console.log('connected to DB')
    })
    let bucket;
    mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket"
  });
    console.log(bucket);
});
}


module.exports = connectDB