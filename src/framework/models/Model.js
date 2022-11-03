const { Model: SequelizeModel } = require('sequelize');
const { DatabaseProvider } = require('../../app/providers/DatabaseProvider');

/**
 * For more information on sequelize attributes & options
 * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
 */
class Model extends SequelizeModel {

    /** 
     * leave null for sequelize to infer 
     * the table name as a pluralized snake cased version of the class name:
     * example:
     *  Class Post will look for table posts
     *  Class CommonCategory will look for table common_categories
     */ 
    static table(){
        return null
    }

    /**
     * For more information on sequelize attributes & options
     * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
     */
    static attributes(){
        return {
            // Model attributes are defined here
        }
    }

    /**
     * to learn more about available relations please reference sequelize docs
     * https://sequelize.org/docs/v6/core-concepts/assocs/
     */
    static relations(){
        return {
            
        }
    }
    
    /**
     * to learn more about available options please reference sequelize docs
     * https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
     */
    static options(){
        return {
            // Other model options go here
            sequelize: DatabaseProvider.factory(), // We need to pass the connection instance
            modelName: this.getTable(), // We need to choose the model name,
            underscored: true, // tells sequelize to convert table names and column names into snake case
            paranoid: true, // soft deletes ( deleted_at column )
        }
    }

    /**
     * Visit sequlize docs for list of available hooks and their firing order.
     * https://sequelize.org/docs/v6/other-topics/hooks/#available-hooks
     */
    static hooks(){
        return {

        }
    }
    
    static getTable(){
        let table = this.table() ?? this.name;
        table = table.split(/(?=[A-Z])/).join('_').toLowerCase();
        return table.toLowerCase();
    }
    
    static getOptions(){
        const _options = Model.options();
        const options = this.options();
        _options.modelName = this.getTable();
        return {
            ..._options,
            ...options,
            hooks: this.hooks()
        }
    }

    static factory(){
        return new this();
    }

    static register(){
        Log.Debug({heading:`Registering Model ${this.name}`})
        const attributes = this.attributes();
        const options = this.getOptions();
        this.init(attributes, options);
    }

    static registerRelations(){
        for(let [relationType, relations] of Object.entries(this.relations())){

            if(!(relationType in this)) continue

            for(let relation of relations){

                if(relation.options) this[relationType](relation.model, relation.options)
                else this[relationType](relation.model);

            }

        }
    }

}

module.exports = {
    Model
}