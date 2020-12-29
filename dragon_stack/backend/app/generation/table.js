const pool = require('../../databasePool.js');

class generationTable {
  
    static storeGeneration(generation){
        pool.query(
            'insert into generation(expiration) VALUES ($1)',[
                generation.expiration
            ],
            (err, result)=>{
                if (err) return console.error(err);
            }
        )
    }
}

module.exports = generationTable;