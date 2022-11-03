---
to: src/routes/<%= h.inflection.pluralize(name) %>.js
---

const {Router} = require('express');
const HasScopes = require('../app/http/middleware/HasScopes');
const { <%= h.inflection.pluralize(Name) %>Controller } = require('../app/http/controllers/<%= h.inflection.pluralize(Name) %>Controller');
const { Create<%= h.inflection.singularize(Name) %>Request: CreateRequest } = require('../app/http/requests/<%= h.inflection.pluralize(name) %>/Create<%= h.inflection.singularize(Name) %>Request');
const { List<%= h.inflection.pluralize(Name) %>Request: ListRequest } = require('../app/http/requests/<%= h.inflection.pluralize(name) %>/List<%= h.inflection.pluralize(Name) %>Request');
const { Retrieve<%= h.inflection.singularize(Name) %>Request: GetRequest } = require('../app/http/requests/<%= h.inflection.pluralize(name) %>/Retrieve<%= h.inflection.singularize(Name) %>Request');
const { Update<%= h.inflection.singularize(Name) %>Request: UpdateRequest } = require('../app/http/requests/<%= h.inflection.pluralize(name) %>/Update<%= h.inflection.singularize(Name) %>Request');
const { Delete<%= h.inflection.singularize(Name) %>Request: DeleteRequest } = require('../app/http/requests/<%= h.inflection.pluralize(name) %>/Delete<%= h.inflection.singularize(Name) %>Request');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = <%= h.inflection.pluralize(Name) %>Controller.factory();

const router = Router();

router.post('/', HasScopes(['<%= scope %>_create']), CreateRequest.handle(),Controller.create);
router.get('/', HasScopes(['<%= scope %>_read']), ListRequest.handle(),Controller.list);
router.get('/:id', HasScopes(['<%= scope %>_read']), GetRequest.handle(),Controller.retrieve);
router.put('/:id', HasScopes(['<%= scope %>_update']), UpdateRequest.handle(),Controller.update);
router.delete('/:id', HasScopes(['<%= scope %>_delete']), DeleteRequest.handle(),Controller.delete);

module.exports =  router



