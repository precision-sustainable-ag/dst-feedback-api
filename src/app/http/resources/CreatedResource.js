const { Resource } = require('./Resource');

class CreatedResource  extends Resource{

    getStatus(){
        return 201;
    }

}

module.exports =  {
    CreatedResource
};