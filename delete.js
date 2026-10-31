const express = require('express');
const port = 3000;
const pool = require('./db.js');
const cors = require('cors');
const route = express.Router();
route.use(express.json());
route.use(cors());
route.delete('/' , async(req , res)=>{
    try {
        const {id} = req.body;
        const isProductAvailable = await pool.query(
            `SELECT PRODUCT_ID FROM PRODUCT WHERE PRODUCT_ID = $1`,
            [id]
        )
        if(isProductAvailable.rows.length > 0){
            const deleteProdct = await pool.query(
            `DELETE FROM PRODUCT WHERE PRODUCT_ID = $1 RETURNING *`,
            [id]
        )
        return res.status(200).send({
            message: 'item deleted',
            product:deleteProdct.rows[0]
        })
        }else{
            return res.status(400).send({message : 'item does not exist'});
        }

        
    } catch (error) {
        return res.status(500).send({message: `error at /delete ${error}`})
        
    }
})

module.exports = route;