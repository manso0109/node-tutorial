const crypto = require('crypto')
const fs = require('fs')
const decrypt = require('./decrypt')

// const convert = (from, to) => str => Buffer.from(str, from).toString(to)
// const utf8ToHex = convert('utf8', 'hex')
// const hexToUtf8 = convert('hex', 'utf8')

const receivedData = require('./signMessage').packageOfDataToSend

const hash = crypto.createHash(receivedData.algorithm)

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem' , 'utf8')

const decryptedMessage = decrypt.decryptWithPublicKey(publicKey,receivedData.signedAndEncryptedData)

const decryptedMessageHex = decryptedMessage.toString()

const hashOfTheOriginal = hash.update(JSON.stringify(receivedData.originalData))

const hashOfTheOriginalHex = hash.digest('hex')

// console.log(hexToUtf8(decryptedMessageHex));

if(hashOfTheOriginalHex === decryptedMessageHex) {
    console.log('Success!, The data has not been tampered with and the sender is valid');
} else {
    console.log('Uh oh ... someone is trying to manipulate the data or someone else is sending');
}