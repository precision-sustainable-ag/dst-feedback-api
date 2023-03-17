const {RenderableError} = require('./RenderableError')

class InternalServerError extends RenderableError {
    
    static [Symbol.hasInstance](obj) {
        if(!obj.status && !(typeof obj.status == 'function')) return false;
        const status = obj.status();
        return status == 500;
    }

    status(){
        return 500
    }
    
    content(){
        return "application/json"
    }
    
    description(){
        return "Internal Server Error";
    }

    schema(){
        return {
            type: 'object',
            properties: {
                key:{type:"string"},
                messages: {type:'array',items:{type:'string'}}
            }
        }
    }

    wrapper(){
        return {
            type:'object'
        };
    }

    build(data){
        return {
            type:'object',
            ...this.errors,
        };
    }

}

module.exports =  {
    InternalServerError
}