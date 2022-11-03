---
to: src/app/models/<%= h.inflection.singularize(Name) %>.js
---

const { DataTypes } = require('sequelize');
const { Model } = require('./Model')

/**
 * For more information on sequelize attributes & options
 * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
 */
class <%= h.inflection.singularize(Name) %> extends Model {

    /**
     * For more information on sequelize attributes & options
     * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
     */
    static attributes(){
        return {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            label: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }
    }

    /**
     * For more information on sequelize relations
     * please visit https://sequelize.org/docs/v6/core-concepts/assocs/
     */
    static relations(){
        return {
        }
    }

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
     * Generally speaking you will not need to add any aditional options
     * that are not already set in the base model. 
     * The primary reason to add options here is to override base model options
     * or to add additional column indexes.
     * 
     * For more information on sequelize attributes & options
     * please visit https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
     */
    static options(){
        return {}
    }


}

module.exports =  {
    <%= h.inflection.singularize(Name) %>
};


