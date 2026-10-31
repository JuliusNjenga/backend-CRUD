const express = require('express');
const port = 3000;
const route = express.Router();
const cors = require('cors');
const pool = require('./db.js');
const { create } = require('node:domain');
route.use(express.json());
route.use(cors());

route.post('/' , async(req,  res)=>{
    try {
        const {name , type , price , quantity} = req.body;
        const isProductsValid = name && type && price && quantity && quantity >=1;
        if(!isProductsValid){
            return res.status(400).send({message : 'invalid'});
        };
        const createProduct = await pool.query(
            `INSERT INTO PRODUCT(PRODUCT_NAME , PRODUCT_TYPE , PRODUCT_PRICE , PRODUCT_QUANTITY)
            VALUES($1 , $2 , $3, $4) RETURNING *`,
            [name , type , price , quantity]
        );
        if(createProduct.rows.length === 0){
            return res.status(401).send({message: 'User exists'})
        };

        return res.status(200).send({
            message : 'Created',
            products : createProduct.rows[0]
            // product : {
            //     product_name : name,
            //     product_type: type,
            //     product_price : price,
            //     product_quantity : quantity
            // }
        });
        
    } catch (error) {
        return res.status(500).send({message :`Error at create-products ${error}`});
        
    }

})

module.exports = route;