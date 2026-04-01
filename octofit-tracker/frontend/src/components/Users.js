import EntityTableCard from './EntityTableCard';
import { extractListFromApiResponse, getApiBaseUrl } from '../api';

const API_BASE = getApiBaseUrl();
const ENDPOINT = `${API_BASE}/api/users/`;

const COLUMNS = [
  { header: 'Name', field: 'name' },
  { header: 'Email', field: 'email' },
  { header: 'Team', field: 'team' },
];

async function loadUsers(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to load users');
  }

  const data = await response.json();
  return extractListFromApiResponse(data);
}

function Users() {
  return (
    <EntityTableCard
      title="Users"
      description="View athlete accounts and their team membership."
      endpoint={ENDPOINT}
      columns={COLUMNS}
      rowKey={(user) => user._id || `${user.email}-${user.name}`}
      loadData={loadUsers}
      emptyMessage="No users found."
    />
  );
}

export default Users;
