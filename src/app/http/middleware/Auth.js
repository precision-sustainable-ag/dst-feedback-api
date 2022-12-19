const { Log } = require('../../providers/LoggingProvider');
const { JwtService } = require('../../services/jwt/JwtService');


function ParseScopes(scopes){
    if(!scopes) return [];
    if(scopes instanceof String) scopes = scopes.trim().split(',');
    return scopes;

}

module.exports = (scopes) => {
    scopes = ParseScopes(scopes);

    return async (req,res,next) => {
        if(!req.token) {
            const token = await JwtService.decode(req.headers.authorization);
            req.token = token;
        }

        if(!req.token) {
            req.authorized = false;
            return next();
        }

        if(scopes.length <= 0){
            req.authorized = true;
            return next();
        } 

        const tokenScopes = req?.token?.scopes;

        for(let scope of scopes){
            if(!tokenScopes.includes(scope)){
                req.authorized = false;
                return next();
            }
        }

        return next();

    }

}
