const { Client } = require("pg");
const db_conf = require("../../../config/database");


class PostgresService {

    getSSL(){
        if(db_conf.ssl === 'true'){
            return {
                ssl:{
                    rejectUnauthorized: false,
                }
            }
        }
        return {};
    }

    constructor(settings){

        this.settings = settings;
        this.ssl = this.getSSL();
        this.queries = [];
        this.watching = {};
        this.client = null;
        this.listener = null;

    }

    buildClient(database, settings){
        if(!settings) settings = this.settings;
        if(!database) database = settings.database;
        const ssl = this.ssl;
        return new Client({
            user: settings.username,
            password: settings.password,
            host: settings.host,
            database: database,
            ...ssl
        });
    }

    async buildListener(database, settings){
        if(this.listener) return;

        this.listener = this.buildClient(database, settings);
        await this.listener.connect();

        const watching = this.watching;

        this.listener.on('notification', (msg) => {
            const channel = msg.channel;
            if(channel in watching){
                const callback = watching[channel];
                callback(msg);
            }
        })
    }

    async listen({channel, callback, database, settings}){
        if(!this.listener) this.buildListener(database, settings);

        await this.listener.query(`LISTEN ${channel}`);
        this.watching[channel] = callback;
    }

    open({client, database, settings}){
        if(this.client) return this.client

        if(!client) client = this.buildClient(database,settings);
        this.client = client;
        
        return this;
    }

    async execute(config={}){
        if(!this.client) this.open(config);

        const results = [];
        await this.client.connect();

        for(let query of this.queries){
            const result = await this.client.query(query.sql,query.params);
            const output = await query.resolver(result);
            results.push(output);
            if(output === false) break;
        }

        await this.client.end();
        this.client = null;
        this.queries = [];

        return results;
    }

    query({sql, params, resolver}){
        if(!params) params = [];
        if(!resolver) resolver = () => true;

        this.queries.push({
            sql, params, resolver
        });

        return this;
    }

    findExistingDatabase(database){

        const sql = `
            SELECT true 
            WHERE EXISTS (
                SELECT FROM pg_database WHERE datname = $1::text
            )`;
        

        return this.query({
            sql,
            params: [database],
            resolver: (result) => result.rowCount >=1
        });
    }

    createNotifyDataEditFunction(){
        const sql = `
            CREATE OR REPLACE FUNCTION notify_data_edit() RETURNS TRIGGER AS $notify_data_edit$
                DECLARE
                    model TEXT;
                BEGIN        
                    --
                    -- set channel to first argument
                    -- package operation / old / new data into json object
                    -- and use that json object as the payload in a notification event
                    --
                    model = TG_ARGV[0]::TEXT;
                    
                    PERFORM (
                        with payload(model,operation,old,"new") as (
                            SELECT 
                                model as model,
                                TG_OP as operation,
                                row_to_json(OLD)::TEXT as old,
                                row_to_json(NEW)::TEXT as "new"
                        )
                        SELECT pg_notify('data_edit',row_to_json(payload)::TEXT) FROM payload
                    );
                    
                    RETURN NULL; -- result is ignored since this is an AFTER trigger
                END;
            $notify_data_edit$ LANGUAGE plpgsql;
        `;

        return this.query({sql});
    }

    createDataEditTrigger(table, channel){
        if(!channel) channel = table;
        const sql = `
            CREATE TRIGGER notify_data_edit
            AFTER INSERT OR UPDATE OR DELETE ON ${table}
                FOR EACH ROW EXECUTE FUNCTION notify_data_edit('${channel}');
        `;

        return this.query({sql});
    }

    createTriggers(){
        return this.createNotifyDataEditFunction()
            .createDataEditTrigger('crops','crop')
            .createDataEditTrigger('families','family')
            .createDataEditTrigger('regions','region')
            .createDataEditTrigger('zones','zone')
            .createDataEditTrigger('images','image')
            .createDataEditTrigger('synonyms','synonym')
            .createDataEditTrigger('crops_zones','cropsZone')
            .createDataEditTrigger('groups','group');
    }
    
    findNonExistingDatabase(database){

        const sql = `
            SELECT true 
            WHERE NOT EXISTS (
                SELECT FROM pg_database WHERE datname = $1::text
            )`;
        

        return this.query({
            sql,
            params: [database],
            resolver: (result) => result.rowCount >=1
        });
    }

    createDatabase(database){

        const sql = `
            CREATE DATABASE ${database}
        `;

        return this.query({
            sql,
            params: [],
            resolver: (result) => true
        });
    }


    createDatabaseIfNotExists(database){

        return this
            .findNonExistingDatabase(database)
            .createDatabase(database);

    }

}


module.exports = {
    PostgresService
}