const express = require('express')
const app = express()
const logger = require('./logger.js')
const authorize = require('./authorize.js')
// req => middleware => res

// 1. use vs route
// 2. options - our own / express / thrid party

// app.use([logger , authorize])
// app.use(express.static('./public'))

app.get('/' , (req,res)=> {
    res.send('Home')
})

app.get('/about' , (req,res)=> {
    res.send('About')
})

app.get('/api/products' ,[authorize , logger], (req,res)=> {
    res.send('Products')
})

app.get('/api/items',[authorize , logger] , (req,res)=> {
    res.send('Items')
})


app.listen(5000,() => {
    console.log('server is listening on port 5000 ....');
})