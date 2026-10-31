const express = require('express');
const cors = require('cors');
const pool = require('./db.js');
const route = express.Router();
const port = 3000;
route.use(express.json());
route.use(cors());

route.post('/' , async(req, res)=>{
    try {
        const {id , quantity} = req.body;
        const insertQuantity = await pool.query(
            `INSERT INTO ORDERS(PRODUCT_ID , ORDER_QUANTITY , ORDER_TOTAL_PRICE) VALUES($1 , $2, (SELECT PRODUCT_PRICE FROM PRODUCT WHERE PRODUCT_ID = $1) * $2::integer)RETURNING *`,
            [id , quantity]
        );
        const total_price = insertQuantity.rows[0].order_total_price;
        return res.status(200).send({
            message: 'item price',
            price : total_price
        })
        
    } catch (error) {
        return res.status(500).send({message: `Error at order ${error}`});
        
    }
    
});


module.exports = route;