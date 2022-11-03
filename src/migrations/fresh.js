const {ModelsProvider} = require('../app/providers/ModelsProvider');
const {DatabaseProvider} = require('../app/providers/DatabaseProvider');

const settings = DatabaseProvider.settings();

DatabaseProvider.Service().open({database:'postgres'})
    .createDatabaseIfNotExists(settings.database)
    .execute()
    .then(() => {
        DatabaseProvider.sync(ModelsProvider,{force:true});
    });


