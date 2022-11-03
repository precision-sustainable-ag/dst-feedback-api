const {ModelsProvider} = require('./app/providers/ModelsProvider');
const {DatabaseProvider} = require('./app/providers/DatabaseProvider');
const {LoggingProvider} = require('./app/providers/LoggingProvider');
const {ValidatorProvider} = require('./app/providers/ValidatorProvider');
const {MiddlewareProvider} = require('./app/providers/MiddlewareProvider');
const {RoutesProvider} = require('./app/providers/RoutesProvider');
const { QueueProvider } = require('./app/providers/QueueProvider');
const queues = require('./config/queues');
const watching = require('./config/databaseListeners');

const Providers = [
    LoggingProvider, //logging provider should be first so any other provider failures can be logged.
    DatabaseProvider, //!db provider must be registered before models provider.
    ModelsProvider,
    ValidatorProvider
];

async function RegisterProviders(app){
    for(let provider of Providers){
        if(await provider.register(app) == false) return false;
    }

    await QueueProvider.register(queues); 
    await DatabaseProvider.registerListeners(watching);
}



async function bootstrap(app){
    if(await RegisterProviders(app) == false) return false;
    // first bootstrap global middleware
    await MiddlewareProvider.RegisterGlobalMiddleware(app);
    // third bootstrap routes
    await RoutesProvider.register(app);
    // lastly bootstrap end of life cycle middleware
    await MiddlewareProvider.RegisterEndOfLifecycleMiddleware(app)

    return true;
}

module.exports = {
    bootstrap, RegisterProviders, Providers
}