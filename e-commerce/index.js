require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connect')
const app = express()
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')




app.use(express.json())

app.use('/api/v1/auth' , authRoute)
app.use('/api/v1/users' , userRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/cart',cartRoute)
app.use('/api/v1/order',orderRoute)



app.listen(process.env.PORT || 3000 , async () => {
    await connectDB(process.env.MONGO_URI,process.env.USER,process.env.PASS) 
    console.log('backend server is running');
})