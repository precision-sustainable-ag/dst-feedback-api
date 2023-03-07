const { Controller } = require('../../../framework/controllers/Controller');
const { PostFeedbackToGithub } = require('../../jobs/PostFeedbackToGithub');
const { Issue } = require('../../models/Issue');
const {SlackLogger} = require('../../support/logging/SlackLogger');
const { CRITICAL } = require('../../support/logging/Logger');
const { Log } = require('../../providers/LoggingProvider');
class IssuesController extends Controller {

    async create(req){

        const payload = req.validated.body;
        const jobPayload = {...payload};
        payload.labels = JSON.stringify(payload.labels);
        const issue = await Issue.create(payload);

        let handled = false;
        let error = null;
        if(issue?.id){
            try{
                const job = new PostFeedbackToGithub(jobPayload);
                handled = await job.handle();
            } catch(err){
                Log.Critical({message:err,heading:'Failed to Post to Github'});
                error = err;
            }

            if(!handled){
                const message = {
                    payload: issue.dataValues,
                    error: error.message,
                    stack: error.stack
                }
                const notifyer = new SlackLogger();
                notifyer.log({message, heading:'Feedback Failed To Post to GitHub', level:CRITICAL});
            }
            
        }

        return {
            status: handled ? 'success' : 'failed',
            payload: issue.dataValues
        }

    }
}

module.exports = {
    IssuesController
};