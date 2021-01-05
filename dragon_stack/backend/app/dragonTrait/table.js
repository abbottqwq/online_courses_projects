const pool = require("../../databasePool");
const TraitTable = require('../trait/table.js')

class DragonTraitTable {
	static storeDragonTrait({ dragonId, traitType, traitValue }) {
		return new Promise((resolve, reject) => {
            TraitTable.getTraitId({traitType, traitValue})
                .then(({traitId})=>{
                    pool.query(
                        `insert into dragonTrait(traitId, dragonId) values ($1, $2)`,
                        [traitId,dragonId],
                        (err, res) => {
                            if(err) return reject(err);
                            resolve(res);
                        }
                    );
                });
        });
	}
}

module.exports = DragonTraitTable;
