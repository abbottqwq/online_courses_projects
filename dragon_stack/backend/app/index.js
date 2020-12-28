const GenerationEngine = require('./generation/engine.js');
const {SECONDS} = require('./config.js');
const express = require('express');
const dragonRouter = require('./api/dragon.js')
const generationRouter = require('./api/generation.js');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);
engine.start();




module.exports = app;
