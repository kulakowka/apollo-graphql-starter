const { createError } = require('apollo-errors')

module.exports = {
  AuthorizationRequired: createError('AuthorizationRequired', { message: 'Authorization required' }),
  Forbidden: createError('Forbidden', { message: 'Forbidden' }),
  InvalidPassword: createError('InvalidPassword', { message: 'Invalid password' }),
  InvalidToken: createError('InvalidToken', { message: 'Invalid token' }),
  UserExists: createError('UserExists', { message: 'User exists' }),
  UserNotFound: createError('UserNotFound', { message: 'User not found' })
}
