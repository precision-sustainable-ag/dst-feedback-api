const { Log } = require('../../providers/LoggingProvider');
const { RenderableError } = require('../../../framework/errors/RenderableError');
const { InternalServerError } = require('../../../framework/errors/InternalServerError');


module.exports =  (err, req, res, next) => {

    if(err instanceof InternalServerError){
        Log.Critical({message:err, heading:'Internal Server Error'});
    }

    if (err instanceof RenderableError){
        return err.render(res);
    }

    let error = err;
    
    if(!(error instanceof InternalServerError)) error =  new InternalServerError({errors:[{message:err.message,stack:err.stack}]});

    return error.render(res);

}