const express = require('express');
const app = express()
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect.js')
require('dotenv').config()
const notFound = require('./middleware/not-found.js')
const error = require('./middleware/error-handler.js')
const port = process.env.PORT || 3000
// middleware
app.use(express.static('./public'))
app.use(express.json())
app.get('/hello' , (req,res) =>{
    res.send('Task Manager App')
})
app.use('/api/v1/tasks' , tasks)
app.use(notFound)
app.use(error)
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI , process.env.USER,process.env.PASS)
        app.listen(port , console.log('server is listening on port ' + port))
    }
    catch (error) {
        console.log(error)
    }
}
start()

