const GITHUB_API_URL = 'https://api.github.com';

export async function commitComponent({ token, owner, repo, branch = 'main', filePath, content, message }) {
  if (!token) throw new Error('GitHub token is required. Please add it in Settings.');
  if (!owner || !repo) throw new Error('GitHub owner and repo are required. Please configure in Settings.');

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Check if file already exists (to get the SHA for updates)
  let sha;
  try {
    const existingRes = await fetch(
      `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
      { headers }
    );
    if (existingRes.ok) {
      const existing = await existingRes.json();
      sha = existing.sha;
    }
  } catch {
    // File doesn't exist, that's fine
  }

  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
    branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${filePath}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `GitHub API request failed: ${res.status}`);
  }

  const data = await res.json();
  return data.content.html_url;
}

export async function listComponents({ token, owner, repo, branch = 'main', path = 'components' }) {
  if (!token) throw new Error('GitHub token is required.');
  if (!owner || !repo) throw new Error('GitHub owner and repo are required.');

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const res = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    { headers }
  );

  if (res.status === 404) return [];

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `GitHub API request failed: ${res.status}`);
  }

  const files = await res.json();
  return files.filter((f) => f.name.endsWith('.jsx') || f.name.endsWith('.js'));
}

export async function getComponentContent({ token, owner, repo, branch = 'main', path }) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const res = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    { headers }
  );

  if (!res.ok) throw new Error(`Failed to fetch file: ${res.status}`);

  const data = await res.json();
  return decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))));
}
