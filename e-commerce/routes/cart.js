const router = require('express').Router()
const {verifyTokenAndAuthorization, verifyTokenAdmin, verifyToken} = require('./verifyToken')
const Cart = require('../models/cart.js')

//Create

router.post("/" ,verifyToken,async (req,res) => {
    try{
        const newCart = await Cart.create(req.body)
        return res.status(200).json(newCart)
    }catch (err){
        res.status(500).json(err)
    }
})

router.patch("/:id", verifyTokenAndAuthorization , async (req,res) => {
    try{
        const updatedCart= await cart.findByIdAndUpdate(req.params.id,
           {$set:req.body} , {new:true ,runValidators: true})   
        return res.status(200).json(updatedCart)
    }catch (err) {
        return res.status(500).json(err)
    }
})
// delete
router.delete("/:id" , verifyTokenAndAuthorization , async (req,res)=> {
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    }   
    catch (err){
        res.status(500).json(err)
    }
})

// get user Cart
router.get("/find/:userId", verifyTokenAndAuthorization , async (req,res)=> {
    try{
        const cart = await Cart.find({userId: req.params.userId})
        return res.status(200).json({cart})
    }   
    catch (err){
        res.status(500).json(err)
    }
})

// Get All
router.get("/",verifyTokenAdmin , async (req,res) => {
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router