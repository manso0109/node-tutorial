const http = require('http')
const {readFileSync} = require('fs')
// get all files 
const homePage = readFileSync('./build/navbar-app/index.html')
const homeStyles = readFileSync('./build/navbar-app/styles.css')
const homeImage = readFileSync('./build/navbar-app/logo.svg')
const homeLogic = readFileSync('./build/navbar-app/browser-app.js')

const server = http.createServer( (req , res)=>  {
    const url = req.url
    // home page
    if (url === '/' || url === '')
    {
        console.log('user hit the server')
        res.writeHead(200,{'content-type':'text/html'})
        res.write(homePage)
        res.end('')
    } 
    // about page
    else if (url === '/styles.css') {
        console.log('user hit the styles server')
        res.writeHead(200,{'content-type':'text/css'})
        res.write(homeStyles) 
        res.end('')
    }
    else if (url === '/logo.svg') {
        console.log('user hit the logo server')
        res.writeHead(200,{'content-type':'image/svg+xml'})
        res.write(homeImage) 
        res.end('')
    }
    else if (url === '/browser-app.js') {
        console.log('user hit the logic server')
        res.writeHead(200,{'content-type':'text/javascript'})
        res.write(homeLogic) 
        res.end('')
    }
    else  {
        console.log('user hit the wrong server')
        res.writeHead(404,{'content-type':'text/html'})
        res.write('<h1>page not found</h1>')
        res.end('')
    }


})

server.listen(5000)

