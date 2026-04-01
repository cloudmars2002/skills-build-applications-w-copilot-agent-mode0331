import EntityTableCard from './EntityTableCard';
import { extractListFromApiResponse, getApiBaseUrl } from '../api';

const API_BASE = getApiBaseUrl();
const ENDPOINT = `${API_BASE}/api/leaderboard/`;

const COLUMNS = [
  { header: 'Team', field: 'team' },
  { header: 'Points', field: 'points' },
];

async function loadLeaderboard(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to load leaderboard');
  }

  const data = await response.json();
  return extractListFromApiResponse(data);
}

function Leaderboard() {
  return (
    <EntityTableCard
      title="Leaderboard"
      description="Compare teams by their accumulated challenge points."
      endpoint={ENDPOINT}
      columns={COLUMNS}
      rowKey={(row) => row._id || row.team}
      loadData={loadLeaderboard}
      emptyMessage="No leaderboard rows found."
    />
  );
}

export default Leaderboard;
