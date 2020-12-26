const Generation = require('./generation.js');

const generation = new Generation();

console.log(generation);

const gooby = generation.newDragon();
console.log(gooby);

setTimeout(() => {
    const mimar = generation.newDragon();
    console.log(`mimar is ${mimar}`);
}, 15000);
