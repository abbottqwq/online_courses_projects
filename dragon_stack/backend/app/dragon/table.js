const pool = require("../../databasePool.js");

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
                    //TODO: 
                    console.log(res);
					const dragonId = res.rows[0].id;
					resolve({ dragonId });
				}
			);
		});
	}
}

module.exports = DragonTable;
