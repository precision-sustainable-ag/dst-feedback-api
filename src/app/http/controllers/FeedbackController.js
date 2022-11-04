// const { Feedback } = require('../../models/Feedback');
const { Controller } = require('./Controller');
const { CreatedResource } = require('../resources/CreatedResource');
const { PostFeedbackToGithub } = require('../../jobs/PostFeedbackToGithub');

const include = [];

class FeedbackController extends Controller {

    async create(req){

        const payload = req.validated;

        PostFeedbackToGithub.Queue(payload);

        return new CreatedResource({
            resource: {queued: true}
        });

    }

}

module.exports = {
    FeedbackController
};