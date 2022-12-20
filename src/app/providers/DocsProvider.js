
const {Provider} = require('../../framework/providers/Provider');

const swaggerUi = require('swagger-ui-express');
const openapi = require('../../config/openapi');

const options = {
  explorer: true
};


class DocsProvider extends Provider {

    static async register(app, routesProvider){
        // set inital document
        app.openapi = openapi;

        const routes = routesProvider.factory();
        
        for(let [file, router] of Object.entries(routes)){

            app.openapi.paths = {
                ...app.openapi.paths,
                ...router.document()
            }

        }
        
        // expose endpoint to access documentation.
        app.use('/', swaggerUi.serve, swaggerUi.setup(app.openapi, options));

        return true;
    }


    static factory(){
        return null;
    }

}

module.exports = {
    DocsProvider
}
