

const { GitHubService } = require("../services/github/GitHubService");
const { Job } = require("../../framework/jobs/Job");
const { Log } = require("../providers/LoggingProvider");


class PostFeedbackToGithub extends Job {
    
    
    static channel() {
        return 'push_to_github';
    }

    async data() {
        Log.Debug({heading:'GitHub Issue Payload',message:this.payload});
        return this.payload;
    }

    buildBodyString(data){
        const codeBracket = "```";
        return `${codeBracket}\n${JSON.stringify(data,null,"\t")}\n${codeBracket}`;
    }

    async handle() {
        const data = await this.data();

        const service = new GitHubService();

        if(!data.title) data.title = `${data.name} - ${data.email}`;

        const body = this.buildBodyString({
            name: data.name,
            email: data.email,
            comment: data.comments
        });

        Log.Debug({heading:'Posting Issue to GitHub',message:data});

        const response = await service.postIssue({
            repo: data.repository,
            title: data.title,
            body,
            labels:data.labels
        });

        Log.Debug({heading:`Post Feedback To GitHub Job Status`, message: {sent:  (response?.status === 201)}});

        return response?.status === 201;
    }


}

module.exports = {
    PostFeedbackToGithub
}