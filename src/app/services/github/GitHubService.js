const { appId, privateKey, organization } = require('../../../config/github');
const { Octokit } = require('@octokit/core');
const { createAppAuth } = require('@octokit/auth-app');

class GitHubService {

    constructor(org){
        if(!org) org = organization;
        this.organization = org;
        // this will be set later.
        this.APP_CLIENT = null;
        this.INSTALLATION_CLIENT = null;
    }

    buildClient(options){
        return new Octokit(options);
    }

    getAppClientOptions(){
        return {
            authStrategy: createAppAuth,
            auth: { appId, privateKey }
        }
    }

    async getAppClient(){
        if(this.APP_CLIENT) return this.APP_CLIENT;

        return this.APP_CLIENT = this.buildClient(this.getAppClientOptions());
    }

    async getInstallationClient(){
        if(this.INSTALLATION_CLIENT) return this.INSTALLATION_CLIENT;

        const org = this.organization;
        const options = this.getAppClientOptions();

        options.auth.installationId = await this.getAppClient().then(async app => {
            const res = await app.request('GET /orgs/{org}/installation', { org });
            return res?.data?.id;
        })

        return this.INSTALLATION_CLIENT = this.buildClient(options);

    }

    async postIssue({owner, repo, title='', body='', labels=[]}){
        if(!owner) owner = this.organization;

        return this.getInstallationClient().then(client => {
            return client.request('POST /repos/{owner}/{repo}/issues', {
                owner, 
                repo,
                title,
                body,
                labels
            })
        });
    }



}

module.exports = {
    GitHubService
}