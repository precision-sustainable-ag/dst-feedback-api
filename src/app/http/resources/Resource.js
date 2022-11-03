
class Resource {

    object(){
        return 'object';
    }

    constructor({resource,status,meta}){
        this.resource = resource;
        this.status = status;
        this.meta = meta;
    }

    getStatus(){
        return this.status ?? 200;
    }

    getMeta(){
        return this.meta;
    }

    getResource(req){
        const meta = this.getMeta(req);
        const object = this.object();
        const data = this.resource
        return {
            object,
            data,
            meta
        };
    }


    render({res, req}){

        res.status(this.getStatus()).send(this.getResource(req));

    }


}

module.exports =  {
    Resource
};