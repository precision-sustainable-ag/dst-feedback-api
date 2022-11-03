---
to: src/app/http/requests/<%= h.inflection.pluralize(name) %>/List<%= h.inflection.pluralize(Name) %>Request.js
---

const { PaginatedRequest } = require('../PaginatedRequest');

class List<%= h.inflection.pluralize(Name) %>Request extends PaginatedRequest {

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
    List<%= h.inflection.pluralize(Name) %>Request
};


