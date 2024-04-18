const router = require('express').Router()
const {verifyTokenAndAuthorization, verifyTokenAdmin} = require('./verifyToken')
const User = require('../models/user.js')
const CryptoJS = require('crypto-js')
router.patch("/:id", verifyTokenAndAuthorization , async (req,res) => {
    if (req.body.password) {
        console.log(req.body.password);
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC.toString()
        )
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
           {$set:req.body} , {new:true ,runValidators: true})   
        return res.status(200).json(updatedUser)
    }catch (err) {
        return res.status(500).json(err)
    }
})
// delete
router.delete("/:id" , verifyTokenAndAuthorization , async (req,res)=> {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }   
    catch (err){
        res.status(500).json(err)
    }
})

// get user
router.get("/find/:id" , verifyTokenAdmin , async (req,res)=> {
    try{
        const user = await User.findById(req.params.id)
        const {password , ...others} = user._doc;
        return res.status(200).json({...others})
    }   
    catch (err){
        res.status(500).json(err)
    }
})

// get all users
router.get("/" , verifyTokenAdmin , async (req,res) => {
    const query = req.query.new
    try {
        const users = query ? await User.find().limit(5).sort({_id: -1}) : await User.find()
        res.status(200).json({users})
    } catch (err) {
        return res.status(500).json(err)
    }
})

// get user stats
router.get("/stats" , verifyTokenAdmin , async (req,res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() -  1 ))
    try{
        const data = await User.aggregate([
            {
                $match:{createdAt : {$gte:lastYear}}
            },
            {
                $project: {
                    month:{$month:"$createdAt"}
                }
            },
            {
                $group:{
                    _id: "$month",
                    total:{$sum:1}
                }
            }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router