const http = require('http')

const server = http.createServer((req , res)=> {
    if(req.url == '/'){
        res.write('')
        res.end('welcome to our home page');
    }
    else if (req.url == '/about'){
        res.write('')
        res.end('here is our short history');

    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h1>oops</h1><p>we can\'t seem to find the page you are looking for</p><a href="/">back home</a>')
        res.end()
    }
})

server.listen(5000)