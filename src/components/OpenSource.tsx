'use client';

import { motion } from 'framer-motion';
import { AlgoraBounty, AlgoraResponse, ContributionStats } from '@/types/algora';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

interface OpenSourceProps {
  contributions: AlgoraResponse;
  stats: ContributionStats;
}

export default function OpenSource({ contributions, stats }: OpenSourceProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-gray-900/50 rounded-lg border border-primary/20 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-primary/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-sm font-mono text-gray-400">
                contributions.stats
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatsCard
                  title="Projects"
                  value={stats.totalProjects}
                  icon={<FiCode className="w-5 h-5" />}
                />
                <StatsCard
                  title="Pull Requests"
                  value={stats.totalPRs}
                  icon={<FiGithub className="w-5 h-5" />}
                />
                <StatsCard
                  title="Technologies"
                  value={stats.technologies.length}
                  icon={<FiCode className="w-5 h-5" />}
                />
              </div>
              <div className="text-center mt-4 text-sm text-gray-500">
                Data culled from algora.io
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contributions Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {contributions.items.map((contribution) => (
            <ContributionCard
              key={contribution.id}
              contribution={contribution}
              variants={item}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon }: { title: string; value: number | string; icon: React.ReactNode }) {
  return (
    <div className="p-4 backdrop-blur-sm bg-gray-900/30 rounded-lg border border-primary/10">
      <div className="flex items-center gap-2 text-primary mb-2">
        {icon}
        <span className="text-sm font-mono">{title}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function ContributionCard({ contribution, variants }: { contribution: AlgoraBounty; variants: any }) {
  const { task, org } = contribution;

  return (
    <motion.div
      variants={variants}
      className="group relative backdrop-blur-sm bg-gray-900/50 rounded-lg border border-primary/20 overflow-hidden hover:border-primary/40 transition-colors"
    >
      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
      
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-primary/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-sm font-mono text-gray-400">
          {org.handle}/{task.repoName}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12">
            <Image
              src={org.avatarUrl.startsWith('http') ? org.avatarUrl : `https://console.algora.io${org.avatarUrl}`}
              alt={org.displayName}
              className="rounded-lg"
              fill
              sizes="48px"
            />
          </div>
          <div>
            <h3 className="font-semibold text-white">{org.displayName}</h3>
            <div className="flex gap-2 text-xs text-gray-400">
              {org.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-full bg-gray-800/50 border border-primary/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <h4 className="text-lg font-medium text-white mb-4">{task.title}</h4>

        <div className="flex items-center justify-end text-sm">
          <Link
            href={`https://github.com/${task.repoOwner}/${task.repoName}/pull/${task.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            View PR <FiExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
