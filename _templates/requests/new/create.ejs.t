---
to: src/app/http/requests/<%= h.inflection.pluralize(name) %>/Create<%= h.inflection.singularize(Name) %>Request.js
---

const { <%= h.inflection.singularize(Name) %> } = require('../../../models/<%= Name %>');
const { EditRequest } = require('../EditRequest');

class Create<%= h.inflection.singularize(Name) %>Request extends EditRequest {

    /**
     * returns the model class,
     * this is used when getting the validation rules 
     * and will interpret the model attributes to generate mode rules.
     */
    model(){
        return <%= h.inflection.singularize(Name) %>;
    }

    /**
     * For more information please check ValidatorJS documentation.
     * https://github.com/mikeerickson/validatorjs
     */
    rules(){
        return {
        }
    }

    /**
     * returns map of route parameter keys to inject into data
     * and their data type.
     */
    params(){
        return {
        };
    }
    

    // return true to by-pass need for authorization
    authorized(){
        return false;
    }

}

module.exports =  {
    Create<%= h.inflection.singularize(Name) %>Request
};


