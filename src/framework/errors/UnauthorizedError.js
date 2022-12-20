const {RenderableError} = require('./RenderableError');

class UnauthorizedError extends RenderableError {

    constructor(errors){
        super();
        this.errors = errors;
    }

    status(){
        return 401
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Unauthorized Error";
    }

    schema(){
        return {
            type: 'object',
            properties: {
                type:{type:'string'},
                errors: {
                    type:'object',
                    properties:{
                        key:{type:'string'},
                        messages:{type:'array', items:{type:'string'}}
                    }
                }
            }
        }
    }

    wrapper(){
        return this.schema();
    }

    build(data){
        return {
            type:'object',
            errors:{
                key: 'Unauthorized',
                messages: this.errors ?? [],
            }
        };
    }

}

module.exports =  {
    UnauthorizedError
}