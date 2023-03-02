const { IssuesController } = require("../app/http/controllers/IssuesController");

const { CreateIssueRequest } = require("../app/http/requests/issues/CreateIssueRequest");
const { CreateIssueResource } = require("../app/http/resources/issues/CreateIssueResource");
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const Public = require('../app/http/middleware/Public');

module.exports = Router.expose({path:'/v1', routes: [

    // Route.post({path:'/issues', summary:"Create a Feedback Object",
    //     request: CreateFeedbackRequest,
    //     handler:IssuesController.factory().create,
    //     response: CreateFeedbackResource
    // }).middleware([Public]),

    Route.post({path:'/issues', summary:"Create a Issue Object, which posts to Github.",
        request: CreateIssueRequest,
        handler:IssuesController.factory().create,
        response: CreateIssueResource
    }).middleware([Public]),

]});
