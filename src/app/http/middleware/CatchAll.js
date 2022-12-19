
const { ForbiddenAccessError } = require('../../../framework/errors/ForbiddenAccessError');

module.exports =  (req,res,next)=>{
    throw new ForbiddenAccessError();
}