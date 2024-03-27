const express = require('express');
const app = express()
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect.js')
require('dotenv').config()

const port = 3000
// middleware
app.use(express.static('./public'))
app.use(express.json())

app.get('/hello' , (req,res) =>{
    res.send('Task Manager App')
})

app.use('/api/v1/tasks' , tasks)

// app.get('/api/v1/tasks')              -get all the tasks
// app.post('/api/v1/tasks')             -create a new tasks
// app.get('/api/v1/tasks/:id')          -get a single task
// app.patch('/api/v1/tasks/:id')        -update task
// app.get('/api/v1/tasks/:id')          -delete task

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

