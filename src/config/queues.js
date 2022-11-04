const { PostFeedbackToGithub } = require('../app/jobs/PostFeedbackToGithub');
const {env} = require('./kernel');

module.exports =  {
    push_to_github: {
        handler: PostFeedbackToGithub
    }
}