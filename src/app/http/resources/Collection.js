const { Resource } = require('./Resource');

class Collection extends Resource {

    object(){
        return 'array';
    }

    constructor({resource,status,meta}){
        super({resource,status,meta});
        if(!(this.resource instanceof Array)) this.resource = [this.resource];
    }


}

module.exports =  {
    Collection
};