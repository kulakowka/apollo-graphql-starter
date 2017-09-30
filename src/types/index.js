const { readFileSync } = require('fs')
const { resolve } = require('path')
var glob = require('glob')

module.exports = glob
  .sync('**/*.graphql', {cwd: __dirname})
  .map(file => readFileSync(resolve(__dirname, file), 'utf8'))
  .join('\n')
