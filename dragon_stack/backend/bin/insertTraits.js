const pool = require("../databasePool.js");
const TRAITS = require("../data/traits.json");

TRAITS.forEach((trait) => {
	const traitType = trait.type;
	const traitValues = trait.values;
	traitValues.forEach((traitValue) => {
		pool.query(
			`insert into trait("traitType", "traitValue") 
            values ($1, $2) returning id`,
			[traitType, traitValue],
			(err, res) => {
				if (err) return console.log(err);
				const traitId = res.rows[0].id;
				console.log(`inserted trait id: ${traitId}`);
			}
		);
	});
});
