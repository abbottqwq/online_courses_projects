const GenerationEngine = require('./engine.js');
const {SECONDS} = require('./config.js');
const express = require('express');

const engine = new GenerationEngine();

engine.start();

