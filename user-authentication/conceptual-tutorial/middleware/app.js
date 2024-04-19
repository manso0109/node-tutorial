const express = require('express')

const app = express()

function middleware1  (req,res,next) {
    req.customProperty = 100
    next()
}

function middleware2 (req,res,next) {
    console.log('the custom property value is : ' + req.customProperty);
    req.customProperty=600
    next()
}



function errorHandler (err,req,res,next) {
    if (err) {
        res.json({err:err})
    }
}

app.use(middleware1)
app.use(middleware2)

app.get('/' , (req,res,next) =>  {
    console.log("i'm in the standard express function");
    res.send("<h1>The value is : " +req.customProperty +"</h1>")
})

app.use(errorHandler)


app.listen(3000 , () => console.log("listening to port 3000"))