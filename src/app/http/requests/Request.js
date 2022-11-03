const BodyParser = require('body-parser')
const { ValidatorProvider } = require('../../providers/ValidatorProvider');
const { Log } = require('../../providers/LoggingProvider');
const app_conf = require('../../../config/app');

class Request  {


    rules(){
        return {}
    }

    parser(){
        return BodyParser.json();
    }
    
    data(req){
        if(req.method == 'GET'){
            return this._data = req.query;
        }
        return this._data = req.body;
    }

    authorized(){
        return false;
    }


    authorize(){
        return (req, res, next) => {

            if(app_conf.authorized) req.authorized = true;

            if(!req.authorized){
                req.authorized = this.authorized();
            }

            next();
        }
    }

    getRules(){
        const rules = this.rules();
        return rules;
    }

    validate() {
        const _instance = this;
        return (req,res,next) => {
            const rules = _instance.getRules(req);
            const data = _instance.data(req);
            
            ValidatorProvider.factory().validate({data,rules});
            req.validated = {};
            for(let key in rules){
                // if(data[key] != null && data[key != 'undefined'])
                if(typeof data[key] == 'undefined' || data[key] == null) continue;
                req.validated[key] = data[key];
            }
            // req.validated = data

            return next();
        };
    }

    static handle(){
        const _instance = new this();

        return [
            _instance.parser(),
            _instance.authorize(),
            _instance.validate()
        ];
    }

}

module.exports = {
    Request
}