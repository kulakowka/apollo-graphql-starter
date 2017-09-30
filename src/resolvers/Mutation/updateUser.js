module.exports = async function updateUser (root, { input }, { pubsub, errors, viewer, mongodb, ObjectID, services }) {
  if (!viewer) throw new errors.AuthorizationRequired()

  const user = await mongodb
    .collection('users')
    .findOne({
      _id: new ObjectID(viewer._id)
    })

  if (!user) throw new errors.UserNotFound()

  const isValidPassword = await services.bcrypt.compare(input.password, user.password)

  if (!isValidPassword) throw new errors.InvalidPassword()

  const { name, email, newPassword } = input

  const $set = {
    updatedAt: new Date()
  }

  if (name) $set.name = name
  if (email) $set.email = email
  if (newPassword) $set.password = await services.bcrypt.hash(newPassword, 10)

  const { value } = await mongodb
    .collection('users')
    .findOneAndUpdate({
      _id: new ObjectID(viewer._id)
    }, {
      $set
    }, {
      returnOriginal: false
    })

  pubsub.publish('userUpdated', { userUpdated: value })

  return value
}
