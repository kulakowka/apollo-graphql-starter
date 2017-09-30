const pino = require('pino')()

module.exports.info = pino.info.bind(pino)
module.exports.error = pino.error.bind(pino)
module.exports.middleware = require('express-pino-logger')({
  logger: pino
})
