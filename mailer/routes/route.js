const express = require('express')
const router = express.Router()
const {signup , getBill} = require('../controller/appController.js')

router.post('/user/signup', signup)
router.post('/product/getbill',getBill)

module.exports = router