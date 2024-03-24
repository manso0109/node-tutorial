const express = require('express');
const app = express()
const tasks = require('./routes/tasks.js')

const port = 3000

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

app.listen(port , console.log('server is listening on port ' + port))