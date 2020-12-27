const GenerationEngine = require('./engine.js');
const {SECONDS} = require('./config.js')

const engine = new GenerationEngine();

engine.start();

setTimeout(()=>{
    engine.stop();
}, 20 * SECONDS);