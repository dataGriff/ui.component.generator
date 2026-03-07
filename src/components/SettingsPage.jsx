export default function SettingsPage({ settings, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    onSave({
      openaiApiKey: form.get('openaiApiKey'),
      openaiModel: form.get('openaiModel'),
      githubToken: form.get('githubToken'),
      githubOwner: form.get('githubOwner'),
      githubRepo: form.get('githubRepo'),
      githubBranch: form.get('githubBranch') || 'main',
      componentsPath: form.get('componentsPath') || 'components',
    });
    alert('Settings saved!');
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} className="settings__form">

        <section className="settings__section">
          <h3>🤖 OpenAI Configuration</h3>
          <p className="settings__hint">
            Provide your OpenAI API key to enable natural language component generation.
            Your key is stored locally in your browser only.
          </p>
          <label className="form-label">OpenAI API Key</label>
          <input
            className="form-input"
            type="password"
            name="openaiApiKey"
            defaultValue={settings?.openaiApiKey || ''}
            placeholder="sk-..."
            autoComplete="off"
          />
          <label className="form-label">Model</label>
          <select className="form-input" name="openaiModel" defaultValue={settings?.openaiModel || 'gpt-4o-mini'}>
            <option value="gpt-4o-mini">GPT-4o Mini (fast, affordable)</option>
            <option value="gpt-4o">GPT-4o (best quality)</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo (fastest)</option>
          </select>
        </section>

        <section className="settings__section">
          <h3>🐙 GitHub Configuration</h3>
          <p className="settings__hint">
            Configure your GitHub personal access token and repository details to commit generated components.
            Token needs <code>repo</code> scope. Stored locally only.
          </p>
          <label className="form-label">Personal Access Token</label>
          <input
            className="form-input"
            type="password"
            name="githubToken"
            defaultValue={settings?.githubToken || ''}
            placeholder="ghp_..."
            autoComplete="off"
          />
          <div className="settings__row">
            <div>
              <label className="form-label">Owner (username/org)</label>
              <input
                className="form-input"
                name="githubOwner"
                defaultValue={settings?.githubOwner || ''}
                placeholder="your-username"
              />
            </div>
            <div>
              <label className="form-label">Repository</label>
              <input
                className="form-input"
                name="githubRepo"
                defaultValue={settings?.githubRepo || ''}
                placeholder="my-components"
              />
            </div>
          </div>
          <div className="settings__row">
            <div>
              <label className="form-label">Branch</label>
              <input
                className="form-input"
                name="githubBranch"
                defaultValue={settings?.githubBranch || 'main'}
                placeholder="main"
              />
            </div>
            <div>
              <label className="form-label">Components Path</label>
              <input
                className="form-input"
                name="componentsPath"
                defaultValue={settings?.componentsPath || 'components'}
                placeholder="components"
              />
            </div>
          </div>
        </section>

        <button type="submit" className="btn btn--primary">💾 Save Settings</button>
      </form>
    </div>
  );
}
