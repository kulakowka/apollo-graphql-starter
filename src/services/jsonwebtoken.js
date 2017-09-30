const { promisify } = require('util')
const { sign, verify, decode } = require('jsonwebtoken')

module.exports = {
  sign: promisify(sign),
  verify: promisify(verify),
  decode: promisify(decode)
}
