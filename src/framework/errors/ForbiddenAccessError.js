const {RenderableError} = require('./RenderableError');

class ForbiddenAccessError extends RenderableError {

    constructor(errors){
        super();
        this.errors = ['Unauthorized', ...errors];
    }

    status(){
        return 403
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Forbidden Access Attempt";
    }

    schema(){
        return {
            type: 'object',
            properties: {
                type:{type:'string'},
                messages: {type:'array',items:{type:'string'}}
            }
        }
    }

    build(data){
        data = this.errors;
        return {
            type:'object',
            ...data,
        };
    }

}

module.exports =  {
    ForbiddenAccessError
}