const http = require('http')

const server = http.createServer((req,res) => {
    if (req.url == '/'){
        res.write('')
        res.end('Home Page')
    } else if (req.url == '/about'){
        // BLOCKING CODE !!!!
        for (let i = 0  ; i < 1000 ; i++){
            for (let j = 0 ; j < 1000 ; j++){
                console.log(i + ' ' + j);
            }
        }
        res.write('')
        res.end('About Page')
    } else {
        res.write('')
        res.end('Error Page')
    }
})
server.listen(5000 , ()=>{
    console.log('server is listening on port : 5000 ...');
})