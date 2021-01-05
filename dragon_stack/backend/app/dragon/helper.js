const pool = require("../../databasePool.js");
const DragonTable = require("./table.js");
const Dragon = require("./index.js");

const getDragonWithTraits = ({ dragonId }) => {
	return Promise.all([
		DragonTable.getDragon({ dragonId }),
		new Promise((resolve, reject) => {
			pool.query(
				`select "traitType", "traitValue" 
                 from trait
                 inner join dragonTrait
                 on trait.id = dragonTrait."traitId"
                 where dragonTrait."dragonId" = $1`,
				[dragonId],
				(err, res) => {
					if (err) return reject(err);
					resolve(res.rows);
				}
			);
		}),
	])
		.then(([dragon, dragonTraits]) => {
			return new Dragon({
                ...dragon,
                traits: dragonTraits,
                dragonId
				// nickname: dragon.nickname,
				// birthday: dragon.birthday,
				// generationId: dragon.generationId,
			});
		})
		.catch((err) => console.error(err));
};

getDragonWithTraits({dragonId: 1})
.then(dragon => console.log(dragon))
.catch(err => console.error(err));

module.exports = {getDragonWithTraits};
