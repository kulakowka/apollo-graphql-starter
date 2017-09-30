const { withFilter } = require('graphql-subscriptions')
const { pubsub } = require('../../services')

module.exports = {
  subscribe: withFilter(
    (query, params) => pubsub.asyncIterator('userUpdated'),
    (payload, variables) => {
      return payload.userUpdated.id === variables.id
    }
  )
}
