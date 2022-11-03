---
to: src/app/http/requests/<%= h.inflection.pluralize(name) %>/Delete<%= h.inflection.singularize(Name) %>Request.js
---

const { GetRequest } = require('../GetRequest');

class Delete<%= h.inflection.singularize(Name) %>Request extends GetRequest {

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
    Delete<%= h.inflection.singularize(Name) %>Request
};


