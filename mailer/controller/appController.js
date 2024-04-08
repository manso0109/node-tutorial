const nodeMailer = require('nodemailer')
const Mailgen = require('mailgen')
const {EMAIL,PASSWORD} = require('../env')
// send mail from testing account
const signup = async (req,res) => {
    let testAccount = await nodeMailer.createTestAccount()
    let transporter = nodeMailer.createTransport({
        host:"smtp.ethereal.email",
        port:587,
        secure:false,
        auth:{
            user:testAccount.user,
            pass:testAccount.pass
        }
    })

    let message = {
        from:"fred foo <foo@example.com>",
        to:"bar@example.com,baz@example.com",
        subject:"Hello world",
        text:"hello mother father",
        html:"<b>hello world?</b>"
    }
    transporter.sendMail(message).then((info)=>{
        return res.status(201).json({
            msg:"you should receive an email" , 
            info:info.messageId,
            preview:nodeMailer.getTestMessageUrl(info)})
    }).catch((error) => {
        return res.status(500).json({error})
    })
    // res.status(201).json('signup successfully')
}

// send mail from real gmail account

const getBill = (req,res) =>{
    const {userEmail} = req.body
    let config = {
        service:'gmail',
        auth :{
            user:EMAIL,
            pass:PASSWORD,
        }
    }
    let transporter = nodeMailer.createTransport(config)
    let MailGenerator = new Mailgen({
        theme:"default",
        product:{
            name:"Mailgen",
            link:"https://mailgen.js/"
        }
    })
    let response = {
        body : {
            name:"Daily tuition",
            intro:"your bill has arrived",
            table:{
                data:[
                    {
                    item:"Nodemailer stack book",
                    description : "A backend application",
                    price:"$10.99"
                }
            ]
            },
            outro:"Looking forward to do more business"
        }
    }
    let mail = MailGenerator.generate(response)
    let message = {
        from:EMAIL,
        to:userEmail,
        subject:'Place order',
        html:mail
    }
    transporter.sendMail(message).then(()=>{
        return res.status(201).json({
            msg:"you should receive an email"
        })
    }).catch ((error) => {
        return res.status(500).json({error})
    })
    // res.status(201).json('getBill successfully')
}

module.exports = {
    signup,
    getBill
}