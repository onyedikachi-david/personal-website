export interface Project {
  title: string;
  description: string;
  techStack: string;
  sourceCode: string;
  demoLink?: string;
  image: string;
  imageAlt: string;
}

export const projects: Project[] = [
  {
    title: "hassleFreePr",
    description: "A GitHub application built to optimize issue and pull request workflows using AI.",
    techStack: "TypeScript",
    sourceCode: "https://github.com/yourusername/hassleFreePr",
    image: "/images/projects/hasslefreePr.png",
    imageAlt: "hassleFreePr GitHub App Interface"
  },
  {
    title: "Create-ink!-dapp",
    description: "A development tool for creating ink! smart contracts and decentralized applications (dApps) on the Polkadot network.",
    techStack: "Rust",
    sourceCode: "https://github.com/yourusername/Create-ink-dapp",
    image: "/images/projects/create-ink-dapp.png",
    imageAlt: "Create-ink!-dapp Development Tool"
  },
  {
    title: "DHunt",
    description: "A decentralized application built on Ethereum that allows developers to earn rewards by solving bounties.",
    techStack: "Solidity, React",
    sourceCode: "https://github.com/yourusername/DHunt",
    image: "/images/projects/dhunt.png",
    imageAlt: "DHunt Bounty Platform"
  },
  {
    title: "AjoDAO",
    description: "A decentralized Thrift Platform",
    techStack: "Nextjs, Anchorlang",
    sourceCode: "https://github.com/yourusername/AjoDAO",
    image: "/images/projects/ajodao.png",
    imageAlt: "AjoDAO Thrift Platform Interface"
  },
  {
    title: "ChainHop",
    description: "A decentralised application that allows anyone to search for transactions on any Blockchain",
    techStack: "NodeReal, NextJs",
    sourceCode: "https://github.com/yourusername/ChainHop",
    image: "/images/projects/chainhop.png",
    imageAlt: "ChainHop Transaction Explorer"
  },
  {
    title: "OASIS",
    description: "A decentralized application (DApp) for secure and transparent transactions on the Solana blockchain.",
    techStack: "NextJs, AnchorLang",
    sourceCode: "https://github.com/yourusername/OASIS",
    image: "/images/projects/oasis.png",
    imageAlt: "OASIS DApp Interface"
  },
  {
    title: "Yellow Finance",
    description: "DAO-based thrift decentralized application (DApp)",
    techStack: "Solidity, NextJs",
    sourceCode: "https://github.com/yourusername/yellow-finance",
    demoLink: "https://yellow-finance.demo.com",
    image: "/images/projects/yellow-finance.png",
    imageAlt: "Yellow Finance DApp Interface"
  },
  {
    title: "Algo-mint Lottery",
    description: "Lossless lottery",
    techStack: "Reach-lang, React",
    sourceCode: "https://github.com/yourusername/algo-mint-lottery",
    image: "/images/projects/algo-mint-lottery.png",
    imageAlt: "Algo-mint Lottery Interface"
  }
];
