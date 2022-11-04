
const {port, name} = require('./config/app')
const { Log } = require('./app/providers/LoggingProvider')
const { AppProvider } = require("./app/providers/AppProvider");


AppProvider.factory().then(app => {
    if(app) app.listen(port, () => {
        Log.Info({message:`${name} listening on port ${port}`, heading: 'Application Instantiated:'})
    });
});