const router = require('express').Router()
const User = require('../models/user')
const cryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
// register
router.post("/register",async (req,res) => {
    try {
        const newUser = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:cryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC.toString()),        
        })
        res.status(201).json(newUser)

    } catch (err) {
        res.status(500).json(err)
    }
})

//login

router.post("/login" , async (req,res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) {
            return res.status(401).json("Wrong credentials")
        }
        const hashedPassword = cryptoJS.AES.decrypt(user.password,process.env.PASS_SEC.toString())
        const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8)
        if (req.body.password !== originalPassword) {
            return res.status(401).json("Wrong credentials")
        }
        
        else {
            const accessToken = jwt.sign({
                id:user.id,
                isAdmin:user.isAdmin,
            },process.env.JWT_SECRET, {
                expiresIn:process.env.JWT_LIFETIME
            })
            const {password , ...others} = user._doc;
            return res.status(200).json({...others,accessToken})
        }
    } catch (err) {
        res.status(500).json(err)
    }
    
})

module.exports = router