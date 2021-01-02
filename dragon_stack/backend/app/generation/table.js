const pool = require('../../databasePool.js');

class generationTable {
    static storeGeneration(generation){
        return new Promise((resolve, reject) => {
            pool.query(
                'insert into generation(expiration) VALUES ($1) returning id',
                [generation.expiration],
                (err, result)=>{
                    if (err) return reject(err);
                    const generationId = result.rows[0].id;
                    resolve({generationId});
                }
            )
        });
        
    }
}

module.exports = generationTable;