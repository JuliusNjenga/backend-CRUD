const express = require('express');
const port = 3000;
const cors = require('cors');
const app = express();
const pool = require('./db.js');
const CreateProducts = require('./createProducts.js');
const Orders = require('./order.js');
const DeleteRoute = require('./delete.js');
app.use(express.json());
app.use(cors());

app.use('/create-products', CreateProducts);
app.use('/delete-product' , DeleteRoute);
app.use('/order-product' , Orders);

const server = app.listen(port , ()=>{
    console.log('Server running');
});

server.on('error' , (err)=>{
    if(err.code === 'EADDRINUSE'){
        console.error(`address in use ${error}`);
    }
    console.log('error at port' , port)
})
