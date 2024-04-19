require('dotenv').config()
const express = require('express')
const connectDB = require('./connect')
const session = require('express-session')
const { default: mongoose, Collection } = require('mongoose')

const MongoStore = require('connect-mongo')

var app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const sessionStore =  MongoStore.create({
    mongooseConnection : connectDB(process.env.MONGO_URI,process.env.USER,process.env.PASS),
    collection: 'sessions',
    mongoUrl:process.env.MONGO_URI
})

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store:sessionStore,
    cookie:{
        maxAge:1000*60*60*24 // 1 day
    }
}))

app.get('/' , (req,res,next) =>  {
    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount +1
    } else {
        req.session.viewCount =1
    }
    res.send(`<h1>you have visited this page ${req.session.viewCount} </h1>`)
})

app.listen(3000)
