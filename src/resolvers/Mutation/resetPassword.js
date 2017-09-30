module.exports = async function resetPassword (root, { input }, { errors, services, mongodb, ObjectID }) {
  const decoded = await services.jsonwebtoken.verify(input.token, process.env.JWT_SECRET)

  if (!decoded) throw new errors.InvalidToken()

  const password = await services.bcrypt.hash(input.password, 10)
  const user = await mongodb
    .collection('users')
    .findOneAndUpdate({
      _id: new ObjectID(decoded._id)
    }, {
      $set: {
        password,
        updatedAt: new Date()
      }
    }, {
      returnOriginal: false
    })

  if (!user) throw new errors.UserNotFound()

  return true
}
