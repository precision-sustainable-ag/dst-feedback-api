const { BadRequestError } = require('../../../../framework/errors/BadRequestError');
const { InternalServerError } = require('../../../../framework/errors/InternalServerError');
const { UnprocessibleEntityError } = require('../../../../framework/errors/UnprocessibleEntityError');
const { CreateResource } = require('../../../../framework/resources/CreateResource');
const { Issue } = require('../../../models/Issue');

function transform(data){
    data.payload.labels = JSON.parse(data.payload.labels);
    return data;
}

class CreateIssueResource extends CreateResource {

    /**
    * returns HTTP Status code for the error.
    * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */
    status(){
        return 201
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Returns a Issue Object";
    }

    /**
    * returns schema of data object 
    * written in OpenAPI schema structure
    * https://spec.openapis.org/oas/v3.0.0#schema-object
    */
    schema(){
        const issueSchema = Issue.schema({});
        issueSchema.properties.labels = {
            type: 'array',
            items: {type:'string'}
        };
        return {
            type:'object',
            properties:{
                status: {type:'string',default:'success'},
                payload: issueSchema

            }
        };
    }

    /**
    * build the data object
    */
    build(res,req){
        res.data = transform(res.data);
        return super.build(res,req);
    }

    errors(){
        return [
            BadRequestError,
            UnprocessibleEntityError,
            InternalServerError,
        ]
    }


}

module.exports = {
    CreateIssueResource
}