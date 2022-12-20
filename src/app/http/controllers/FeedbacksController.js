const { Controller } = require('../../../framework/controllers/Controller');
const { PostFeedbackToGithub } = require('../../jobs/PostFeedbackToGithub');

class FeedbacksController extends Controller {

    async create(req){

        const payload = req.validated.body;

        PostFeedbackToGithub.Queue(payload);

        return {queued:true};

    }
}

module.exports = {
    FeedbacksController
};