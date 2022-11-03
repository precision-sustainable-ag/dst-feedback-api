---
to: src/app/http/requests/<%= h.inflection.pluralize(name) %>/Update<%= h.inflection.singularize(Name) %>Request.js
---

const { <%= h.inflection.singularize(Name) %> } = require('../../../models/<%= Name %>');
const { EditRequest } = require('../EditRequest');

class Update<%= h.inflection.singularize(Name) %>Request extends EditRequest {

    /**
     * returns the model class,
     * this is used when getting the validation rules 
     * and will interpret the model attributes to generate mode rules.
     * by default no fields will be explicity required for an update.
     */
    model(){
        return <%= h.inflection.singularize(Name) %>;
    }

    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
    params(){
        return {
            id: 'string'
        };
    }


    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
        }
    }

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  {
    Update<%= h.inflection.singularize(Name) %>Request
};


