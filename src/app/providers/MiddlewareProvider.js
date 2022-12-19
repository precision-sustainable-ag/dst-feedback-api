const CatchAll = require('../http/middleware/CatchAll');
const ErrorRenderer = require('../http/middleware/ErrorRenderer');
const Cors = require('../http/middleware/Cors');
const Auth = require('../http/middleware/Auth');


class MiddlewareProvider {

    static RegisterGlobalMiddleware(app){
        /**
         * please visit documentation for more information on cors package
         * https://www.npmjs.com/package/cors
         */
        app.use(Cors);
        // app.use(Auth());
        // registeration order matters...
   
    }
    
    static RegisterEndOfLifecycleMiddleware(app){
        // registeration order matters...


        // this should be second to last
        app.use(CatchAll);
        // this should always be last.
        app.use(ErrorRenderer);
    }

}

module.exports = {
    MiddlewareProvider
}
