require('dotenv').config()
const express = require('express')
const connectDB = require('./config/database')
const session = require('express-session')
var passport = require('passport')
const MongoStore = require('connect-mongo')
var routes = require('./routes')


var app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const sessionStore =  MongoStore.create({
    mongooseConnection : connectDB(process.env.MONGO_URI,process.env.USER,process.env.PASS),
    collection: 'sessions',
    mongoUrl:process.env.MONGO_URI,
})

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store:sessionStore,
    cookie:{
        maxAge:1000*60*60*24, // 1 day
    }
}))

require('./config/passport')

app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next) => {
    console.log(req.session)
    console.log(req.user)
    next()
})

app.use(routes)


app.listen(3000)