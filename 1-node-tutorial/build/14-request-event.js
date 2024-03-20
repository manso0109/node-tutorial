const http = require('http')

const server = http.createServer()

server.on('request' , (req , res) => {
    res.write('')
    res.end('Welcome')
})

server.listen(5000)