
module.exports = async function signUp (root, { input }, { errors, services, mongodb, pino }) {
  const email = input.email.toLowerCase().trim()
  const isUserExist = await mongodb
    .collection('users')
    .findOne({ email })

  if (isUserExist) {
    throw new errors.UserExists({ data: { email: true } })
  }

  const password = await services.bcrypt.hash(input.password, 10)
  const data = {
    name: input.name,
    email,
    password,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  if (email === process.env.ADMIN_EMAIL) {
    data.isAdmin = true
  }

  const { insertedId } = await mongodb
    .collection('users')
    .insertOne(data)

  const token = await services.jsonwebtoken.sign({
    _id: insertedId,
    isAdmin: data.isAdmin
  }, process.env.JWT_SECRET)
  services.mailer.send('welcome', email, input)

  return { token }
}
