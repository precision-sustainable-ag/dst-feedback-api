const { UnauthorizedError } = require('../errors/UnauthorizedError');


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

                if(!req.authorized) throw new UnauthorizedError();
                
                const result = await method(req)

                res.data = result?.data ? result.data : result;
                res.count = result?.count;

                next();

            } catch(err){
                next(err);
            }
        }
    }

}

module.exports = {
    Controller
}