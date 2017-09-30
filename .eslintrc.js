const fs = require('fs')
const { resolve } = require('path')
const schema = fs.readFileSync(resolve(__dirname, 'src/schema/typeDefs.graphql'), 'utf8')

module.exports = {
  'extends': ['standard'],
  'env': {
    'node': true
  },
  parser: 'babel-eslint',
  rules: {
    'graphql/template-strings': ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'literal'
      env: 'apollo',

      // Import your schema JSON here
      // schemaJson: require('./src/schema.json')

      // OR provide absolute path to your schema JSON
      // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

      // OR provide the schema in the Schema Language format
      schemaString: schema

      // tagName is gql by default
    }]
  },
  plugins: [
    'graphql'
  ]
}
