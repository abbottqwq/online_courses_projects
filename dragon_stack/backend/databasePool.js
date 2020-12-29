const {Pool} = require('pg');
const config = require('./secret/databaseConfig.js');


const pool = new Pool(config);

module.exports = pool;


// pool.query('select * from generation', (err, result) => {
//     if (err) return console.log('Error', err);
//     console.log(`result.rows `, result.rows);
// })
