const Logger = require('./logger')

const logger = new Logger();

logger.on('message',(data) => console.log("Called listern: ", data))

logger.log("Johnny Depp")