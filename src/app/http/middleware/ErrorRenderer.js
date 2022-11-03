
const { RenderableException } = require('../../exceptions/RenderableException');
const { InternalServerError } = require('../../exceptions/InternalServerError');
const { Log } = require('../../providers/LoggingProvider');


module.exports =  (err, req, res, next) => {

    if (err instanceof RenderableException && !(err instanceof InternalServerError)){
        return err.render(res);
    }

    Log.Critical({message:err, heading:'Critical Failure!'});
    let error = err;
    if(!(error instanceof InternalServerError)) error =  new InternalServerError(error.stack);

    return error.render(res);

}