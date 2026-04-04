import type { GithubRepository } from '@/types/data';

import { graphql, type GraphQlQueryResponseData } from '@octokit/graphql';

const HISTORY_QUERY = `
  defaultBranchRef {
    target {
      ... on Commit {
        history(first: 1) {
          edges {
            node {
              ... on Commit {
                id
                abbreviatedOid
                committedDate
                message
                url
                status {
                  state
                }
              }
            }
          }
        }
      }
    }
  }
`;

type GithubRestRepo = {
  description: string | null;
  fork_count: number;
  full_name: string;
  homepage: string | null;
  name: string;
  owner: {
    avatar_url: string;
    html_url: string;
    login: string;
  };
  stargazers_count: number;
  html_url: string;
};

type GithubRestCommit = {
  sha: string;
  html_url: string;
  commit: {
    author: {
      date: string;
    };
    message: string;
  };
};

async function fetchPublicRepoData(owner: string, name: string): Promise<GithubRepository | null> {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'juanlou.dev',
  };

  const [repoResponse, commitResponse] = await Promise.all([
    fetch(`https://api.github.com/repos/${owner}/${name}`, { headers, next: { revalidate: 300 } }),
    fetch(`https://api.github.com/repos/${owner}/${name}/commits?per_page=1`, { headers, next: { revalidate: 300 } }),
  ]);

  if (!repoResponse.ok || !commitResponse.ok) {
    return null;
  }

  const repository = (await repoResponse.json()) as GithubRestRepo;
  const commits = (await commitResponse.json()) as GithubRestCommit[];
  const lastCommit = commits[0];

  return {
    stargazerCount: repository.stargazers_count,
    description: repository.description ?? '',
    homepageUrl: repository.homepage ?? '',
    languages: [],
    name: repository.name,
    nameWithOwner: repository.full_name,
    url: repository.html_url,
    forkCount: repository.fork_count,
    repositoryTopics: [],
    owner: {
      avatarUrl: repository.owner.avatar_url,
      login: repository.owner.login,
      url: repository.owner.html_url,
    },
    lastCommit: lastCommit
      ? {
          id: lastCommit.sha,
          abbreviatedOid: lastCommit.sha.slice(0, 7),
          committedDate: lastCommit.commit.author.date,
          message: lastCommit.commit.message,
          url: lastCommit.html_url,
          status: {
            state: 'EXPECTED',
          },
        }
      : undefined,
  };
}

export async function fetchRepoData({
  repo = '',
  includeLastCommit = false,
}: {
  repo: string;
  includeLastCommit?: boolean;
}): Promise<GithubRepository | null> {
  if (!repo) {
    return null;
  }

  const [owner, name] = repo.split('/');

  if (!owner || !name) {
    return null;
  }

  if (!process.env.GITHUB_API_TOKEN) {
    return fetchPublicRepoData(owner, name);
  }

  try {
    const { repository }: GraphQlQueryResponseData = await graphql(
      `
        query repository($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            stargazerCount
            description
            homepageUrl
            owner {
              avatarUrl
              login
              url
            }
            ${includeLastCommit ? HISTORY_QUERY : ''}
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                node {
                  color
                  name
                }
              }
            }
            name
            nameWithOwner
            url
            forkCount
            repositoryTopics(first: 20) {
              edges {
                node {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      `,
      {
        owner,
        repo: name,
        headers: {
          authorization: `token ${process.env.GITHUB_API_TOKEN}`,
        },
      }
    );
    if (includeLastCommit) {
      repository.lastCommit = repository.defaultBranchRef.target.history.edges[0].node;
      repository.defaultBranchRef = undefined;
    }
    repository.languages = repository.languages.edges.map((edge) => {
      return {
        color: edge.node.color,
        name: edge.node.name,
      };
    });

    repository.repositoryTopics = repository.repositoryTopics.edges.map((edge) => edge.node.topic.name);

    return repository;
  } catch (err) {
    console.error(err);
    return null;
  }
}
