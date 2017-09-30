const MAX_LIMIT = 5000

module.exports = async function logs (root, { query, limit = MAX_LIMIT }, { ObjectID, mongodb, viewer }) {
  if (!viewer.isAdmin) return new Error('Logs awailable only for admin')

  return mongodb
    .collection('logs')
    .find()
    .sort({ $natural: -1 })
    .limit(limit > MAX_LIMIT ? MAX_LIMIT : limit)
    .toArray()
}
