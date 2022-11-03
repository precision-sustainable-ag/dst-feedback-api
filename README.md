# Overview

API Code will ideally be written with [REST design patterns](https://blog.stoplight.io/api-design-patterns-for-rest-web-services), [MVC project structure](https://developer.mozilla.org/en-US/docs/Glossary/MVC) and [SOLID principals](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design). This source code uses the [NodeJS Runtime Environment](https://nodejs.org/en/) and the [ExpressJS Framework](https://expressjs.com/). For detailed information on the stack used __you should always check the online documentation & communities for the most up to date information.__  

### Project Dependencies
- [NodeJS Runtime Environment](https://nodejs.org/en/)
    - [ExpressJS](https://expressjs.com/)
    - [Dotenv](https://www.npmjs.com/package/dotenv)
    - [Sequelize](https://sequelize.org/)
    - [ValidatorJS](https://github.com/mikeerickson/validatorjs)
    - [Luxon](https://www.npmjs.com/package/luxon)
    - [JsonWebToken](https://github.com/auth0/node-jsonwebtoken)

### Non-Code specific Dependencies
- [Docker](https://www.docker.com/)
- [VS Code](https://code.visualstudio.com/)
    - [VSCode REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

# Development

## Overview

ExpressJS is essentially a chain of middleware, where an incoming request is passed through the middleware chain until a response is sent. Essentially everything in an ExpressJS application is middleware and the middleware chain follows the chronology of which middleware was registered first, meaning that order of registration is critically important to how your request will be handled. Because ExpressJS does not wait for asychronous middleware to complete before moving on to the next middleware in the chain, **__All asychronous middleware will be forced to handle their own errors__**

This template adds some opinions & boiler plate code to our api code repos for faster, easier, and more maintainable development.

## Request Chain
> global-middleware -> route-specific-middleware -> end-of-life-middleware

## Middleware functions vs ExpressJS middleware
Everything in ExpressJS is considered middleware, however in this template we have a classification of function handlers that we call "middleware." **__Middleware in the scope of this template is defined as functions that perform actions before or after the request is handled that is not specific to any given route.__** Middleware functions should be stored in the `app/http/middleware` folder.

## Global middleware & End-of-life Middleware
When a [middleware function](#middleware-functions-vs-expressjs-middleware) needs to be **__applied before or after every request for all routes__** then it can be registered as either global or end-of-life middleware. **Global Middleware** occurs before every request, and **End-of-life** middleware occurs after every request. In order to register a [middleware function](#middleware-functions-vs-expressjs-middleware) as either global or end-of-life you will simply add it to the `app/providers/MiddlewareProvider.js` file in the appropiate registration function handler.

## Route Specific middleware
Route specific middleware can be a [middleware function](#middleware-functions-vs-expressjs-middleware), but more commonly will be a [request handler](#request-handlers), and a [controller function](#controllers). Route specific middleware is registered in the declaration of the route (see [Routing](#routing) for more details). 

## Routing
Routers are most commonly created for each unique [model](#models) that exists, but you can create a router for any purpose. Router files are created in the `routes` folder. When a file is added to routes folder, the `app/providers/RoutesProvider.js` will automatically resolve that file name as the prefix for that router during route registration. For more information on Routers please look into the [ExpressJS Router Documentation](https://expressjs.com/en/4x/api.html#router) 
#### for example:
> for the given file structure:
> 
> - routes
>    - posts.js

##### where posts.js:
```
const {Router} = require('express');
const { PostsController } = require('../app/http/controllers/PostsController');
const { ListPostsRequest: ListRequest } = require('../app/http/requests/crops/ListPostsRequest');
const { RetreivePostRequest: RetrieveRequest } = require('../app/http/requests/crops/RetreivePostRequest');

const Controller = PostsController.factory();

const router = Router();

router.get('/', Public, ListRequest.handle(),Controller.list);
router.get('/:id', Public, Retrieve.handle(),Controller.list);

module.exports =  router
```

When the RouterProvider registeres the routes it will resolve this router as:
> GET /posts
> GET /posts/:id


## Request Handlers

Request handlers are created in the `app/http/requests` folder and **ALWAYS** extend one of the base Request classes. It is most common to create a separate request class for every route. Request handlers validate data & the incoming request. For example you might want the incoming query parameters to only include `example=some-text` this would be done by adding `example: ['required','string']` to the rules in the request file. 

## Controllers

Controllers handling manipulating the incoming data, satifying the request, and returning a response. Controllers are created in the `app/http/controllers` folder and **ALWAYS** extend the base Controller class. Controllers should **ALWAYS** be instantiated by calling the classes `factory()` method. The factory method wraps all of the functions defined in the child class so that they are wraped in a try catch, and match the ExpressJS middleware definition. The wrapper also handles building & sending the response. This allows controller functions to focus solely on handling the request & returning the data needed in the response. 

## Resources

Resources are responsible for transforming data into the expected response JSON. Resources are created in the `app/http/resources` folder and should **ALWAYS** extend the base Resource class.

## Run locally ( with mock database )

> Nodemon enables hot refresh for your code changes for an easier deving experiencing.

With [Docker]() installed on you machine issue the following command from within the root directory:  
> ( The folder that has the docker-compose.yml file )
```
docker-compose up
```
> if you are having issues, try running the following command to force docker to re-build the container
```
docker-compose up --build
```

**__Once docker-compose is finished visit localhost:3000!__**

## Run Nodemon locally ( without mock database )

> Nodemon enables hot refresh for your code changes for an easier deving experiencing.

**__Not all functionality will work if not running in docker. Specifically anything that requires a database or redis.__**
**__redis & postgres can also be installed and run locally or externally all youll need to do is add the proper env variables.__**

run the following command in the project root.
```
npm run dev
```