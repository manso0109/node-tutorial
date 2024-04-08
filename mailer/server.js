const express = require('express');
const appRoute = require('./routes/route')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api',appRoute)

app.listen(port,()=>{
    console.log('Server is running on localhost:' + port);
}) 