const {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLUUID
} = require('graphql-custom-types')
const GraphQLJSON = require('graphql-type-json')
const requireDirectory = require('require-directory')
const resolvers = requireDirectory(module)

module.exports = Object.assign(resolvers, {
  Email: GraphQLEmail,
  URL: GraphQLURL,
  DateTime: GraphQLDateTime,
  Username: new GraphQLLimitedString(3, 50, 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890_-.'),
  Password: new GraphQLPassword(3, 50),
  UUID: GraphQLUUID,
  JSON: GraphQLJSON
})
