const pool = require('../../databasePool.js');


class generationTable {
    /**
     *
     * @param {Object} generation
     */
    static storeGeneration(generation){
        pool.query(
            'insert into generation VALUES (:expiration)',{
                expiration: generation.expiration
            },
            (err, result)=>{
                if (err) return console.error(err);
            }
        )
    }
}

module.exports = generationTable;