const { Collection } = require('./Collection');

class PaginatedCollection extends Collection {

    object(){
        return 'paginated';
    }

    constructor({resource,status,count,meta}){
        super({resource,status,meta});
        this.count = count;
    }


    getMeta(req){
        const records = this.count;
        const limit = req.validated.limit;
        const meta = this.meta;
        return {
            page: req.validated.page,
            limit,
            records,
            pages: Math.ceil(records/limit),
            ...meta
        }
    }



}

module.exports =  {
    PaginatedCollection
};