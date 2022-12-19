---
to: src/app/http/controllers/<%= h.inflection.pluralize(Name) %>Controller.js
---

const { <%= h.inflection.singularize(Name) %> } = require('../../models/<%= h.inflection.singularize(Name) %>');
const { Controller } = require('../../../framework/controllers/Controller');
const { RecordNotFoundError } = require('../../../framework/errors/RecordNotFoundError');

class <%= h.inflection.pluralize(Name) %>Controller extends Controller {

    async create(req){

        const params = req.validated.params;
        const payload = req.validated.body;

        const resource = await <%= h.inflection.singularize(Name) %>.create(payload);

        return resource;

    }

    async retrieve(req){

        const params = req.validated.params;

        const resource = await <%= h.inflection.singularize(Name) %>.findOne({
            where: {
                id: params.id
            },
        });

        if(!resource){
            throw new RecordNotFoundError(params,['record not found']);
        }

        return resource;

    }

    async list(req){

        const params = req.validated.params;
        const payload = req.validated.body;

        const {count,rows} = await <%= h.inflection.singularize(Name) %>.findAndCountAll({
            limit: params.limit,
            offset: params.offset,
        });

        return {data:rows, count};

    }

    async update(req){

        const params = req.validated.params;
        const payload = req.validated.body;

        const resource = await <%= h.inflection.singularize(Name) %>.findOne({
            where: {
                id: params.id
            },
        });

        if(!resource){
            throw new RecordNotFoundError(params,['record not found']);
        }

        await resource.update(payload);

        return resource.reload();

    }

    async delete(req){

        const params = req.validated.params;
        
        const resource = await <%= h.inflection.singularize(Name) %>.findOne({
            where: {
                id: params.id
            },
        });

        if(!resource){
            throw new RecordNotFoundError(params,['record not found']);
        }

        await resource.destroy();

        return resource;
    }

}

module.exports = {
    <%= h.inflection.pluralize(Name) %>Controller
};