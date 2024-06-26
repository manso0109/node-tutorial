const router = require('express').Router()
const {verifyTokenAndAuthorization, verifyTokenAdmin, verifyToken} = require('./verifyToken')
const Order = require('../models/order.js')

//Create

router.post("/" ,verifyToken,async (req,res) => {
    try{
        const newOrder = await Order.create(req.body)
        return res.status(200).json(newOrder)
    }catch (err){
        res.status(500).json(err)
    }
})

router.patch("/:id", verifyTokenAdmin , async (req,res) => {
    try{
        const updatedOrder= await cart.findByIdAndUpdate(req.params.id,
           {$set:req.body} , {new:true ,runValidators: true})   
        return res.status(200).json(updatedOrder)
    }catch (err) {
        return res.status(500).json(err)
    }
})
// delete
router.delete("/:id" , verifyTokenAdmin , async (req,res)=> {
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    }   
    catch (err){
        res.status(500).json(err)
    }
})

// get user Orders
router.get("/find/:userId", verifyTokenAndAuthorization , async (req,res)=> {
    try{
        const orders = await Order.find({userId: req.params.userId})
        return res.status(200).json({orders})
    }   
    catch (err){
        res.status(500).json(err)
    }
})

// Get All
router.get("/",verifyTokenAdmin , async (req,res) => {
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    }catch (err) {
        return res.status(500).json(err)
    }
})

// get monthly income 

router.get('/income' , verifyTokenAdmin , async (req,res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await Order.aggregate ([
            {
                $match : {createdAt:{$gte : previousMonth}}
            },
            {
                $project : {
                    month : {$month : "$createdAt"},
                    sales:"$amount"
                }
            },
            {
                $group : {
                    _id:"$month",
                    total:{$sum:"$sales"}
                }
            }
        ])
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router