const { FeedbacksController } = require("../app/http/controllers/FeedbacksController");
const { CreateFeedbackRequest } = require("../app/http/requests/feedbacks/CreateFeedbackRequest");
const { CreateFeedbackResource } = require("../app/http/resources/feedbacks/CreateFeedbackResource");
const { Route } = require("../framework/routing/Route");
const { Router } = require("../framework/routing/Router");
const Public = require('../app/http/middleware/Public');

module.exports = Router.expose({path:'/feedbacks', routes: [

    Route.post({path:'/', summary:"Create a Feedback Object",
        request: CreateFeedbackRequest,
        handler:FeedbacksController.factory().create,
        response: CreateFeedbackResource
    }).middleware([Public]),

]});
