const BodyParser = require('body-parser')
const { RetrieveRequest } = require('./RetrieveRequest');

class GetRequest extends RetrieveRequest {

    parser(){
        return BodyParser.urlencoded({ extended: true });
    }

}

module.exports =  {
    GetRequest
}