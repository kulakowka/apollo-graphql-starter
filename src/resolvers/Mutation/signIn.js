module.exports = async function signIn (root, { input }, { errors, services, mongodb }) {
  const email = input.email.toLowerCase().trim()
  const user = await mongodb
    .collection('users')
    .findOne({ email })

  if (!user) throw new errors.UserNotFound()

  const isValidPassword = await services.bcrypt.compare(input.password, user.password)

  if (!isValidPassword) throw new errors.InvalidPassword()

  const token = services.jsonwebtoken.sign({
    _id: user._id,
    isAdmin: user.isAdmin
  }, process.env.JWT_SECRET)

  return { token }
}
