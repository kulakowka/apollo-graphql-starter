module.exports = async function viewer (root, args, { mongodb, ObjectID, viewer }) {
  if (!viewer) return null

  return mongodb
    .collection('users')
    .findOne({
      _id: new ObjectID(viewer._id)
    })
}
