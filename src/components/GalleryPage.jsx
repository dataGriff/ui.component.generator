import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { listComponents, getComponentContent } from '../services/githubService';
import { getBrandById } from '../brands';
import { exampleComponents } from '../examples';
import ComponentPreview from './ComponentPreview';

export default function GalleryPage({ githubSettings, savedComponents }) {
  const [remoteComponents, setRemoteComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedCode, setSelectedCode] = useState('');
  const [loadingCode, setLoadingCode] = useState(false);
  const [activeTab, setActiveTab] = useState('examples');
  const [selectedExample, setSelectedExample] = useState(null);

  const fetchRemoteComponents = async () => {
    if (!githubSettings?.token || !githubSettings?.owner || !githubSettings?.repo) {
      setError('Configure GitHub settings to view remote components.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const files = await listComponents({
        token: githubSettings.token,
        owner: githubSettings.owner,
        repo: githubSettings.repo,
        branch: githubSettings.branch || 'main',
        path: githubSettings.componentsPath || 'components',
      });
      setRemoteComponents(files);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'remote') {
      fetchRemoteComponents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const viewRemoteCode = async (file) => {
    setSelectedComponent(file.name);
    setLoadingCode(true);
    setSelectedCode('');
    try {
      const code = await getComponentContent({
        token: githubSettings.token,
        owner: githubSettings.owner,
        repo: githubSettings.repo,
        branch: githubSettings.branch || 'main',
        path: file.path,
      });
      setSelectedCode(code);
    } catch {
      setSelectedCode('// Failed to load component code');
    } finally {
      setLoadingCode(false);
    }
  };

  return (
    <div className="gallery">
      <div className="gallery__header">
        <h2>Component Gallery</h2>
        <div className="gallery__tabs">
          <button
            className={`gallery__tab ${activeTab === 'examples' ? 'active' : ''}`}
            onClick={() => { setActiveTab('examples'); setSelectedComponent(null); setSelectedCode(''); }}
          >
            ✨ Examples ({exampleComponents.length})
          </button>
          <button
            className={`gallery__tab ${activeTab === 'local' ? 'active' : ''}`}
            onClick={() => { setActiveTab('local'); setSelectedExample(null); }}
          >
            💾 Local Session ({savedComponents.length})
          </button>
          <button
            className={`gallery__tab ${activeTab === 'remote' ? 'active' : ''}`}
            onClick={() => { setActiveTab('remote'); setSelectedExample(null); }}
          >
            ☁️ GitHub Repository
          </button>
        </div>
      </div>

      <div className="gallery__content">
        {activeTab === 'examples' && (
          <div>
            <div className="gallery__grid">
              {exampleComponents.map((example, i) => {
                const brand = getBrandById(example.brandId);
                return (
                  <div
                    key={i}
                    className={`gallery__card ${selectedExample === i ? 'active' : ''}`}
                    onClick={() => setSelectedExample(selectedExample === i ? null : i)}
                    style={{ borderColor: brand.colors.primary }}
                  >
                    <div className="gallery__card-header" style={{ background: brand.colors.primary }}>
                      <span className="gallery__card-name">{example.name}</span>
                      <span className="gallery__card-brand">{brand.name}</span>
                    </div>
                    <div className="gallery__card-meta">{example.description}</div>
                    <div className="gallery__card-colors">
                      {Object.values(brand.colors).slice(0, 5).map((c, ci) => (
                        <span key={ci} className="preview__color-dot" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedExample !== null && (
              <div style={{ marginTop: '20px' }}>
                <ComponentPreview
                  code={exampleComponents[selectedExample].code}
                  brand={getBrandById(exampleComponents[selectedExample].brandId)}
                  onSave={null}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'local' && (
          <div>
            {savedComponents.length === 0 ? (
              <div className="gallery__empty">
                <div className="gallery__empty-icon">📦</div>
                <h3>No components yet</h3>
                <p>Generate components in the Generator tab to see them here.</p>
              </div>
            ) : (
              <div className="gallery__grid">
                {savedComponents.map((comp, i) => {
                  const brand = getBrandById(comp.brandId);
                  return (
                    <div
                      key={i}
                      className={`gallery__card ${selectedComponent === comp.name + '-local-' + i ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedComponent(comp.name + '-local-' + i);
                        setSelectedCode(comp.code);
                      }}
                      style={{ borderColor: brand.colors.primary }}
                    >
                      <div className="gallery__card-header" style={{ background: brand.colors.primary }}>
                        <span className="gallery__card-name">{comp.name}</span>
                        <span className="gallery__card-brand">{brand.name}</span>
                      </div>
                      <div className="gallery__card-meta">
                        <small>{new Date(comp.createdAt).toLocaleString()}</small>
                      </div>
                      <div className="gallery__card-colors">
                        {Object.values(brand.colors).slice(0, 5).map((c, ci) => (
                          <span key={ci} className="preview__color-dot" style={{ background: c }} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'remote' && (
          <div>
            <div className="gallery__remote-actions">
              <button className="btn btn--ghost btn--sm" onClick={fetchRemoteComponents} disabled={loading}>
                {loading ? '⏳ Loading...' : '🔄 Refresh'}
              </button>
            </div>
            {error && <div className="gallery__error">⚠️ {error}</div>}
            {!error && remoteComponents.length === 0 && !loading && (
              <div className="gallery__empty">
                <div className="gallery__empty-icon">☁️</div>
                <h3>No remote components</h3>
                <p>Commit components from the Generator tab to see them here.</p>
              </div>
            )}
            <div className="gallery__grid">
              {remoteComponents.map((file, i) => (
                <div
                  key={i}
                  className={`gallery__card ${selectedComponent === file.name ? 'active' : ''}`}
                  onClick={() => viewRemoteCode(file)}
                >
                  <div className="gallery__card-header">
                    <span className="gallery__card-name">{file.name.replace('.jsx', '').replace('.js', '')}</span>
                    <span className="gallery__card-brand">GitHub</span>
                  </div>
                  <div className="gallery__card-meta">
                    <a href={file.html_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      View on GitHub ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCode && (
          <div className="gallery__preview">
            <div className="gallery__preview-header">
              <h3>{selectedComponent?.replace(/-local-\d+$/, '')}</h3>
              <button className="btn btn--ghost btn--sm" onClick={() => { setSelectedComponent(null); setSelectedCode(''); }}>
                ✕ Close
              </button>
            </div>
            {loadingCode ? (
              <div className="gallery__loading">Loading code...</div>
            ) : (
              <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                showLineNumbers
                customStyle={{ fontSize: '13px', borderRadius: '8px' }}
              >
                {selectedCode}
              </SyntaxHighlighter>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
