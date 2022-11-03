const { UnAuthorized } = require('../../exceptions/UnAuthorized');
const { Log } = require('../../providers/LoggingProvider');
const { Resource } = require('../resources/Resource');


class Controller {

    static factory(){
        const _instance = new this();

        for ( let propName of Object.getOwnPropertyNames(this.prototype)) {

            if(propName != 'constructor') {
                const prop = _instance[propName];
                _instance[propName] = Controller.wrap(prop)
            }
        }

        return _instance;
    }

    static wrap(method){

        return  async (req, res, next) => {
            try{

                if(!req.authorized) throw new UnAuthorized();
                
                const result = await method(req)

                if(result instanceof Resource){
                    return result.render({res,req});
                }

                return res.send(result);

            } catch(err){
                next(err);
            }
        }
    }

}

module.exports = {
    Controller
}