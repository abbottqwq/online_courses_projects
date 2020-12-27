const GenerationEngine = require('./generation/engine.js');
const {SECONDS} = require('./config.js');
const express = require('express');

const app = express();
const engine = new GenerationEngine();


engine.start();

app.get('/dragon/new', (req, res) => {
    res.json({dragon: engine.generation.newDragon()})
});



module.exports = app;

