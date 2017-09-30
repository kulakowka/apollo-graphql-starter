const { MongoClient, ObjectID } = require('mongodb')
const { graphqlExpress } = require('graphql-server-express')
const { formatError } = require('apollo-errors')
const services = require('../services')
const pino = require('../lib/pino')
const errors = require('../lib/errors')
const { pubsub } = require('../services')

var mongodb = null

module.exports = schema => graphqlExpress(async req => {
  if (!mongodb) {
    mongodb = await MongoClient.connect(process.env.MONGODB_URL)
  }
  return {
    formatError,
    schema,
    context: {
      errors,
      pino,
      viewer: req.user,
      pubsub,
      mongodb,
      services,
      ObjectID
    }
  }
})
