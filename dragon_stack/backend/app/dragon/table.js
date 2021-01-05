const pool = require("../../databasePool.js");
const DragonTraitTable = require("../dragonTrait/Table.js");

class DragonTable {
	static storeDragon(dragon) {
		const { birthday, nickname, generationId } = dragon;
		return new Promise((resolve, reject) => {
			pool.query(
				`insert into dragon(birthday, nickname, "generationId") 
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

	static getDragon({ dragonId }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`select birthday, nickname, "generationId" from dragon where dragon.id = $1`,
				[dragonId],
				(err, res) => {
					if (err) return reject(err);
					if (res.rows.length === 0)
						return reject(new Error(`no dragon with id : ${dragonId}`));

					resolve(res.rows[0]);
				}
			);
		});
	}
}


// DragonTable.getDragon({ dragonId: 3 })
// 	.then((dragon) => console.log(dragon))
// 	.catch((err) => console.log("err", err));

module.exports = DragonTable;
