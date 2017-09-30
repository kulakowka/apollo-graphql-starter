module.exports = async function canDelete (user, args, { viewer, mongodb, ObjectID }) {
  if (!viewer) return false

  const userId = new ObjectID(user._id)
  const viewerId = new ObjectID(viewer._id)

  return viewer.isAdmin || userId.equals(viewerId)
}
