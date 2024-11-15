import { AlgoraResponse, ContributionStats } from '@/types/algora';

const ALGORA_API_URL = 'https://console.algora.io/api/trpc/discovery.listRewardedBounties';

export async function fetchAlgoraContributions(username: string): Promise<AlgoraResponse> {
  const input = {
    json: {
      limit: 50,
      user: username,
      cursor: null
    },
    meta: {
      values: {
        cursor: ["undefined"]
      }
    }
  };

  const response = await fetch(`${ALGORA_API_URL}?input=${encodeURIComponent(JSON.stringify(input))}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Algora contributions');
  }

  const data = await response.json();
  return data.result.data.json;
}

export function calculateContributionStats(data: AlgoraResponse): ContributionStats {
  const uniqueProjects = new Set(data.items.map(item => item.org.displayName));
  const uniqueTechnologies = new Set(data.items.flatMap(item => item.org.tech));
  const totalReward = data.items.reduce((acc, item) => acc + item.reward.amount, 0);

  return {
    totalProjects: uniqueProjects.size,
    totalPRs: data.items.length,
    technologies: Array.from(uniqueTechnologies),
    totalReward: totalReward,
  };
}

export function groupContributionsByOrg(data: AlgoraResponse) {
  return data.items.reduce((acc, item) => {
    const orgName = item.org.displayName;
    if (!acc[orgName]) {
      acc[orgName] = {
        org: item.org,
        contributions: []
      };
    }
    acc[orgName].contributions.push(item);
    return acc;
  }, {} as Record<string, { org: AlgoraResponse['items'][0]['org']; contributions: AlgoraResponse['items'] }>);
}
