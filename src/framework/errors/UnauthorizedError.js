const {RenderableError} = require('./RenderableError');

class UnauthorizedError extends RenderableError {

    constructor(errors){
        super();
        this.errors = ['Unauthorized', ...errors];
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
    UnauthorizedError
}