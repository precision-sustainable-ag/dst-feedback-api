const {env} = require('./kernel');

module.exports = {
    openapi: "3.0.0",
    info: {
        title: env.APP_NAME,
        description: env.APP_DESCRIPTION ?? "",
        version: env.APP_VERSION ?? '1.0.0'
    },
    servers: [
        {url:`http://localhost:${env.APP_PORT ?? 3000}`, description: "local"},
        {url:`https://developfeedback.covercrop-data.org`, description: "development"},
        {url:`https://feedback.covercrop-data.org`, description: "production"},
    ],
    externalDocs:{
        description: "",
        url: ""
    },
    paths: {}
}