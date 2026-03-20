import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/core';
import { makeSimpleRoute, pool } from 'simple-route';

const appId = process.env.GITHUB_APP_ID;
const privateKey = Buffer.from(process.env.GITHUB_PRIVATE_KEY, 'base64').toString('utf-8');
const organization = process.env.GITHUB_ORGANIZATION;

let client;

const postIssue = async ({
  repository,
  title = '',
  name = '',
  email = '',
  comments = '',
  labels = [],
}) => {
  try {
    if (!client) {
      const app = new Octokit({
        authStrategy: createAppAuth,
        auth: { appId, privateKey },
      });

      const { data } = await app.request('GET /orgs/{org}/installation', { org: organization });

      client = new Octokit({
        authStrategy: createAppAuth,
        auth: { appId, privateKey, installationId: data.id },
      });
    }

    return client.request('POST /repos/{owner}/{repo}/issues', {
      owner: organization,
      repo: title === 'CRASH' ? 'dst-crash' : repository,
      title,
      body: `\`\`\`\n${name}\n${email}\n${comments.replace(/^\s+/gm, '')}`.trim(),
      labels,
    });
  } catch (error) {
    console.log(error);
    return {
      error: {
        request: error.request,
        response: error.response,
      },
    };
  }
}; // postIssue

export default async function apiRoutes(app) {
  const simpleRoute = makeSimpleRoute(app, pool, { public: true });

  await simpleRoute(
    '/issues',
    'Database',
    'Create an Issue Object, which posts to GitHub',
    async (repository, title, name, email, comments, labels) => {
      const date = new Date();

      // DIAGNOSTICS ONLY:
      // pool.query(
      //   `
      //     INSERT INTO diagnostics
      //     (appid, privatekey, organization)
      //     VALUES ($1, $2, $3)
      //   `,
      //   [appId, privateKey, organization],
      // );

      pool.query(
        `
          INSERT INTO issues
          (repository, title, name, email, comments, labels, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
          repository || '',
          title || '',
          name || '',
          email || '',
          comments || '',
          JSON.stringify(labels || []).toString(),
          date,
          date,
        ],
      );

      const github = await postIssue({ repository, title, name, email, comments, labels });
      if (github.error) {
        return github;
      }

      return {
        data: { status: 'success' },
      };
    },
    {
      labels: { type: 'array' },
    },
    {
      method: 'post',
      object: true,
    },
  );
}
