const {Router} = require('express');
const { FeedbackController } = require('../app/http/controllers/FeedbackController');
const Public = require('../app/http/middleware/Public');
const { CreateFeedbackRequest } = require('../app/http/requests/feedback/CreateFeedbackRequest');

/**
 * We call the controller factory method
 * because this will create the controller and wrap all of the controller functions
 * with a handler function that returns a valid ExpressJS Middleware function.
 */
const Controller = FeedbackController.factory();

const router = Router();

router.post('/', Public, CreateFeedbackRequest.handle(), Controller.create);

module.exports =  router



