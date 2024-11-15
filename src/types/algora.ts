export interface AlgoraSolver {
  id: number;
  avatarUrl: string;
  login: string;
}

export interface AlgoraReward {
  amount: number;
  currency: string;
}

export interface AlgoraOrg {
  id: string;
  avatarUrl: string;
  handle: string;
  displayName: string;
  tech: string[];
}

export interface AlgoraTask {
  repoOwner: string;
  repoName: string;
  number: number;
  image: string;
  title: string;
}

export interface AlgoraBounty {
  id: string;
  kind: string;
  solvers: AlgoraSolver[];
  commentId: number | null;
  expertsOnly: boolean;
  reward: AlgoraReward;
  pointReward: null;
  task: AlgoraTask;
  org: AlgoraOrg;
}

export interface AlgoraResponse {
  next_cursor: null;
  items: AlgoraBounty[];
}

export interface ContributionStats {
  totalProjects: number;
  totalPRs: number;
  technologies: string[];
  totalReward: number;
}
