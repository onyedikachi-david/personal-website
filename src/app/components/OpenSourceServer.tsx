import { fetchAlgoraContributions, calculateContributionStats } from '@/lib/algora';
import OpenSource from '@/components/OpenSource';

export default async function OpenSourceServer() {
  const contributions = await fetchAlgoraContributions('onyedikachi-david');
  const stats = calculateContributionStats(contributions);

  return (
    <div className="relative z-10 max-w-7xl mx-auto">
      <OpenSource contributions={contributions} stats={stats} />
    </div>
  );
}
