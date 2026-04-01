import EntityTableCard from './EntityTableCard';
import { extractListFromApiResponse, getApiBaseUrl } from '../api';

const API_BASE = getApiBaseUrl();
const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const ENDPOINT = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : `${API_BASE}/api/activities/`;

const COLUMNS = [
  { header: 'User', field: 'user' },
  { header: 'Type', field: 'activity_type' },
  { header: 'Duration (min)', field: 'duration' },
  { header: 'Date', field: 'date' },
];

async function loadActivities(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to load activities');
  }

  const data = await response.json();
  return extractListFromApiResponse(data);
}

function Activities() {
  return (
    <EntityTableCard
      title="Activities"
      description="Monitor workout logs with duration and activity type."
      endpoint={ENDPOINT}
      columns={COLUMNS}
      rowKey={(activity) => activity._id || `${activity.user}-${activity.date}`}
      loadData={loadActivities}
      emptyMessage="No activities found."
    />
  );
}

export default Activities;
