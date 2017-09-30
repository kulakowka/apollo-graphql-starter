module.exports = async function forgotPassword (root, { input }, { errors, services, mongodb }) {
  const email = input.email.toLowerCase().trim()
  const user = await mongodb
    .collection('users')
    .findOne({ email })

  if (!user) throw new errors.UserNotFound()

  const token = await services.jsonwebtoken.sign({ _id: user._id }, process.env.JWT_SECRET)

  services.mailer.send('reset-password', email, {
    token,
    app: input.app,
    name: user.name
  })

  return true
}
