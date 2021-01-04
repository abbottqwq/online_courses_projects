const pool = require("../../databasePool.js");

class TraitTable {
	static getTraitId({ traitType, traitValue }) {
		return new Promise((resolve, reject) => {
			pool.query(
				`select id from trait where traitType = $1 and traitValue = $2`,
				[traitType, traitValue],
				(err, res) => {
					if (err) return reject(err);
					const traitId = res.rows[0].id;
					resolve({ traitId });
				}
			);
		});
	}
}

module.exports = TraitTable;
