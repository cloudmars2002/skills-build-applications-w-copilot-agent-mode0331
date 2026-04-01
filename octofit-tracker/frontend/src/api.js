export function getApiBaseUrl() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  if (process.env.NODE_ENV === 'development') {
    return '';
  }

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const protocol = window.location.protocol;

    const codespacesHostMatch = host.match(/^(.*)-\d+\.app\.github\.dev$/);
    if (codespacesHostMatch) {
      return `${protocol}//${codespacesHostMatch[1]}-8000.app.github.dev`;
    }

    if (host === 'localhost' || host === '127.0.0.1') {
      return `${protocol}//localhost:8000`;
    }
  }

  return 'http://localhost:8000';
}

export function extractListFromApiResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.results)) {
    return data.results;
  }

  return [];
}
