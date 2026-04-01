import EntityTableCard from './EntityTableCard';
import { extractListFromApiResponse, getApiBaseUrl } from '../api';

const API_BASE = getApiBaseUrl();
const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const ENDPOINT = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${API_BASE}/api/workouts/`;

const COLUMNS = [
  { header: 'Name', field: 'name' },
  { header: 'Description', field: 'description' },
  { header: 'Difficulty', field: 'difficulty' },
];

async function loadWorkouts(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to load workouts');
  }

  const data = await response.json();
  return extractListFromApiResponse(data);
}

function Workouts() {
  return (
    <EntityTableCard
      title="Workouts"
      description="Review available workout plans and difficulty levels."
      endpoint={ENDPOINT}
      columns={COLUMNS}
      rowKey={(workout) => workout._id || workout.name}
      loadData={loadWorkouts}
      emptyMessage="No workouts found."
    />
  );
}

export default Workouts;
