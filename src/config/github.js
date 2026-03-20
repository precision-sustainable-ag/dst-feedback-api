const {env} = require('./kernel');

const base64 = env.GITHUB_PRIVATE_KEY
  .replace(/-----BEGIN RSA PRIVATE KEY-----/, '')
  .replace(/-----END RSA PRIVATE KEY-----/, '');

module.exports = {
    appId: env.GITHUB_APP_ID,
    privateKey: atob(base64),
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    organization: env.GITHUB_ORGANIZATION,
    clientSecret: env.GITHUB_CLIENT_SECRETD,
}