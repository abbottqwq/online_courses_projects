const pool = require("../../databasePool.js");
const DragonTraitTable = require("../dragonTrait/Table.js");

class DragonTable {
	static storeDragon(dragon) {
		const { birthday, nickname, generationId } = dragon;
		return new Promise((resolve, reject) => {
			pool.query(
				`insert into dragon(birthday, nickname, generationId) 
                values ($1, $2, $3) returning id`,
				[birthday, nickname, generationId],
				(err, res) => {
					if (err) return reject(err);
					const dragonId = res.rows[0].id;
					Promise.all(
						dragon.traits.map(({ traitType, traitValue }) => {
							return DragonTraitTable.storeDragonTrait({
								dragonId,
								traitType,
								traitValue,
							});
						})
					)
						.then(() => resolve({ dragonId }))
						.catch((err) => console.log(err));

					resolve({ dragonId });
				}
			);
		});
	}
}

module.exports = DragonTable;
