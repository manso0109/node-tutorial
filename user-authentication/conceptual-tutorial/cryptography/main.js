const fs = require('fs')
const encrypt = require('./encrypt')
const decrypt = require('./decrypt')

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem' , 'utf8')

const encryptedMessage = encrypt.encryptWithPublicKey(publicKey , "super secret message")

console.log(encryptedMessage.toString());

const privateKey = fs.readFileSync(__dirname+'/id_rsa_priv.pem' , 'utf8')

const decryptMessage = decrypt.decryptWithPrivateKey(privateKey,encryptedMessage)

console.log(decryptMessage.toString());