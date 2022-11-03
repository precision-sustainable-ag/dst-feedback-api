---
to: src/app/http/controllers/<%= h.inflection.pluralize(Name) %>Controller.js
---

const { <%= h.inflection.singularize(Name) %> } = require('../../models/<%= h.inflection.singularize(Name) %>');
const { Controller } = require('./Controller');
const { PaginatedCollection } = require('../resources/PaginatedCollection');
const { Resource } = require('../resources/Resource');
const { CreatedResource } = require('../resources/CreatedResource');

const include = [];

class <%= h.inflection.pluralize(Name) %>Controller extends Controller {

    async create(req){

        const payload = req.validated;
        payload.include = include;

        const resource = await <%= h.inflection.singularize(Name) %>.create(payload);

        return new CreatedResource({resource});

    }

    async retrieve(req){

        const payload = req.validated;

        const resource = await <%= h.inflection.singularize(Name) %>.findOne({
            where: {
                id: payload.id
            },
            include
        })

        return new Resource({resource});

    }

    async list(req){

        const payload = req.validated;

        const resource = await <%= h.inflection.singularize(Name) %>.findAll({
            limit: payload.limit,
            offset: payload.offset,
            include
        });

        const count = await <%= h.inflection.singularize(Name) %>.count();
        
        return new PaginatedCollection({resource, count});

    }

    async update(req){

        const payload = req.validated;

        const resource = await <%= h.inflection.singularize(Name) %>.findOne({
            where: {
                id: payload.id
            },
            include
        })

        await resource.update(payload);

        return new Resource({resource});

    }

    async delete(req){

        const payload = req.validated;
        
        const resource = await <%= h.inflection.singularize(Name) %>.findOne({
            where: {
                id: payload.id
            },
            include
        })

        await resource.destroy();

        return new Resource({resource});
    }

}

module.exports = {
    <%= h.inflection.pluralize(Name) %>Controller
};