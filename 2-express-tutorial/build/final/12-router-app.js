const express = require('express')
const app = express()
const people = require('./routes/people')
const auth = require ('./routes/auth')
// static assets
app.use(express.static('./build/methods-public'))
// pasre form data
app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use('/api/people' , people)

app.use('/login', auth)

app.listen(5000,() => {
    console.log('server is listening on port 5000 ....');
})