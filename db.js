const {Pool} = require('pg');
const pool = new Pool({
    user : 'postgres',
    host:'localhost',
    password: 'Kenyaleo2020',
    database : 'back_dev',
    port: 5432
});
pool.on('error' , ()=>{
    console.log('error on pg connection');
})
module.exports = pool;