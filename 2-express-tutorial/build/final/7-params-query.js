const express = require('express')
const app = express()
const {products} = require('./data')
app.get('/',(req,res) =>{
    res.send ('<h1>Home Page</h1><a href="/api/products">products</a>')
})

app.get('/api/products' , (req,res)=>{
    const newPorducts = products.map((product)=> {
        const {id,name,image} = product
        return{id,name,image}
    })
    res.json(newPorducts)
})

app.get('/api/products/:productID' , (req,res)=>{
    // console.log(req);
    // console.log(req.params);
    const {productID} = req.params
    const singleProduct = products.find((product) => product.id === Number(productID))
    if(!singleProduct){
        return res.status(404).send('product not found')
    }
    res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req,res) => {
    console.log(req.params);
    res.send('hello worlds')
})

app.get('/api/v1/query',(req,res)=> {
    const {search , limit} = req.query
    console.log(req.query);
    let sortedPorducts = [...products]
    if (search) {
        sortedPorducts = sortedPorducts.filter((product)=> {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        return sortedPorducts = sortedPorducts.slice(0,Number(limit))
    }
    if (sortedPorducts.length < 1) {
        // res.status(200).send('no products available in '+ search)
        return res.status(200).json({success:true , data:[]})
    }
    return res.status(200).json(sortedPorducts)
   
})



app.listen(5000,() => {
    console.log('server is listening on port 5000 ....');
})