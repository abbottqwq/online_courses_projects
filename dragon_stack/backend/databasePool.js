const {Pool} = require('pg');
const config = require('./secret/databaseConfig.js')

const pool = new Pool(config);

module.exports = pool;
