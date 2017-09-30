require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { cors, auth } = require('./middlewares')
const { graphql } = require('./routes')
const { pino } = require('./lib')
const typeDefs = require('./types')
const resolvers = require('./resolvers')
const morgan = require('morgan')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('graphql-tools')
const { graphiqlExpress } = require('apollo-server-express')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = express()
  .disable('x-powered-by')
  .use('*', cors)
  .use(process.env.NODE_ENV === 'production' ? pino.middleware : morgan('dev'))
  .use('/graphql', auth, bodyParser.json(), graphql(schema))

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${process.env.SERVER_PORT}/subscriptions`
}))

// Wrap the Express server
const ws = createServer(server)

ws.listen(process.env.SERVER_PORT, () => {
  pino.info(`API-Server started in ${process.env.NODE_ENV} mode at http://localhost:${process.env.SERVER_PORT}`)
  // Set up the WebSocket for handling GraphQL subscriptions
  return new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions'
  })
})
