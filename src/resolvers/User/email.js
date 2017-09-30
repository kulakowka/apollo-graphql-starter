module.exports = async function isAdmin (user, args, { viewer, mongodb, ObjectID }) {
  return user.isAdmin ? user.email : ''
}
