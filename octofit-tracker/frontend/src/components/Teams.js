import EntityTableCard from './EntityTableCard';
import { extractListFromApiResponse, getApiBaseUrl } from '../api';

const API_BASE = getApiBaseUrl();
const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const ENDPOINT = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : `${API_BASE}/api/teams/`;

const COLUMNS = [
  { header: 'Name', field: 'name' },
  { header: 'Description', field: 'description' },
];

async function loadTeams(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to load teams');
  }

  const data = await response.json();
  return extractListFromApiResponse(data);
}

function Teams() {
  return (
    <EntityTableCard
      title="Teams"
      description="Track active squads and their current descriptions."
      endpoint={ENDPOINT}
      columns={COLUMNS}
      rowKey={(team) => team._id || team.name}
      loadData={loadTeams}
      emptyMessage="No teams found."
    />
  );
}

export default Teams;
