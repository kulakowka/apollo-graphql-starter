const Mailgun = require('mailgun-js')
const pino = require('../lib/pino')
const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

const SITE = 'http://localhost:3000'
const FROM = 'Edu <hello@samples.mailgun.org>'

const templates = {
  'reset-password': ({ name, token, app }) => ({
    subject: 'Reset password',
    text: `${name ? `Hello ${name}!` : 'Hello friend!'} Click to link  to reset your password: ${SITE}/resetPassword/${token}`
  }),
  'welcome': ({ name, email, password }) => ({
    subject: 'Welcome',
    text: `${name ? `Hello ${name}!` : 'Hello friend!'} Welcome to Edu: ${SITE}!`
  })
}

module.exports = {
  async send (template, email, payload) {
    const data = templates[template](payload)
    data.from = FROM
    data.to = email

    pino.info(data, 'email sended')

    return (process.env.NODE_ENV === 'production' && process.env.SEND_MAIL_ENABLED)
      ? mailgun.messages().send(data).catch(error => pino.error(error, 'mail sending error'))
      : Promise.resolve({ id: 0, message: 'Email are sent only in production mode' })
  }
}
