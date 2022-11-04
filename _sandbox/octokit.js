require('module-alias/register');

const { Octokit } = require('@octokit/core');
const { createAppAuth } = require('@octokit/auth-app');
const { appId, privateKey, organization } = require('../src/config/github');
const { GitHubService } = require('../src/app/services/github/GithubService');


function iteration3(){

    const service = new GitHubService();

    const body = JSON.stringify({test:"object",notation:true,because:['i','need','too']}, null, "\t");

    service.postIssue({repo:'test-issues',title:'Service Test',body: "```\n"+body+"\n```",labels:['test','love-it','number 1!']}).then(res => {
        console.log('>>> POSTED!', res.status == 201);
    })

}

iteration3();


async function getClient() {
    return new Octokit({
        authStrategy: createAppAuth,
        auth: { appId, privateKey }
    });
}

function iteration2(){
    const repo = 'test-issues';
    getClient().then(client => {
        client.request('GET /orgs/{org}/installation', {org:organization}).then(res =>{
            const installationId = res?.data?.id;
            if(!installationId) return null;
            const inst = new Octokit({
                authStrategy: createAppAuth,
                auth: { appId, privateKey, installationId }
            });
            inst.request('POST /repos/{owner}/{repo}/issues', {
                owner:organization,
                repo,
                title: 'Found a bug',
                body: 'I\'m having a problem with this.',
                labels: [
                'bug', 'rug', 'snug'
                ]
            })
        })
    })
}

// iteration2();

// THIS ONE DOES NOT WORK LOL
function iteration1(){
    getClient().then(client => {
        client.request('GET /orgs/{org}/installation', {
            org:organization
        }).then(async(res) => {
            const octokit = new Octokit({
                authStrategy: createAppAuth,
                auth: {
                  appId: 1,
                  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
                  installationId: 123,
                },
              });
              
              // authenticates as app based on request URLs
              const {
                data: { slug },
              } = await octokit.rest.apps.getAuthenticated();
              
              // creates an installation access token as needed
              // assumes that installationId 123 belongs to @octocat, otherwise the request will fail
              await octokit.rest.issues.create({
                owner:organization,
                repo: "test-isssues",
                title: "Hello world from " + slug,
              });
        })
    });
    
}