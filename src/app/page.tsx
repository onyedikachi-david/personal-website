import { fetchAlgoraContributions, calculateContributionStats } from '@/lib/algora';
import ClientHome from '@/components/ClientHome';

export default async function Home() {
  const contributions = await fetchAlgoraContributions('onyedikachi-david');
  const stats = calculateContributionStats(contributions);

  return <ClientHome contributions={contributions} stats={stats} />;
}