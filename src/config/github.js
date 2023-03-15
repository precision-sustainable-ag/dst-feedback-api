const {env} = require('./kernel');


module.exports = {
    appId: env.GITHUB_APP_ID,
    privateKey: atob(env.GITHUB_PRIVATE_KEY),
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    organization: env.GITHUB_ORGANIZATION,
    clientSecret: env.GITHUB_CLIENT_SECRETD,
}