import { useState } from 'react';
import { commitComponent } from '../services/githubService';
import { extractComponentName } from '../services/componentGenerator';

export default function GitHubCommitModal({ code, brand, githubSettings, onClose, onSuccess }) {
  const [componentPath, setComponentPath] = useState(() => {
    const name = extractComponentName(code || '');
    return `components/${name}.jsx`;
  });
  const [commitMessage, setCommitMessage] = useState(() => {
    const name = extractComponentName(code || '');
    return `feat: add ${name} component with ${brand?.name || 'default'} brand`;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCommit = async () => {
    if (!githubSettings?.token || !githubSettings?.owner || !githubSettings?.repo) {
      setError('Please configure your GitHub settings (token, owner, repo) in Settings first.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const url = await commitComponent({
        token: githubSettings.token,
        owner: githubSettings.owner,
        repo: githubSettings.repo,
        branch: githubSettings.branch || 'main',
        filePath: componentPath,
        content: code,
        message: commitMessage,
      });
      onSuccess(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal__header">
          <h2>Commit to GitHub</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <div className="modal__body">
          {githubSettings?.owner && githubSettings?.repo ? (
            <div className="modal__repo-info">
              📁 {githubSettings.owner}/{githubSettings.repo} ({githubSettings.branch || 'main'})
            </div>
          ) : (
            <div className="modal__warning">
              ⚠️ GitHub settings not configured. Please go to Settings first.
            </div>
          )}

          <label className="form-label">File Path</label>
          <input
            className="form-input"
            value={componentPath}
            onChange={(e) => setComponentPath(e.target.value)}
            placeholder="components/MyComponent.jsx"
          />

          <label className="form-label">Commit Message</label>
          <input
            className="form-input"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="feat: add component"
          />

          {error && <div className="modal__error">⚠️ {error}</div>}
        </div>

        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button
            className="btn btn--primary"
            onClick={handleCommit}
            disabled={loading || !componentPath || !commitMessage}
          >
            {loading ? '⏳ Committing...' : '🚀 Commit to GitHub'}
          </button>
        </div>
      </div>
    </div>
  );
}
