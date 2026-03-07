import { useState } from 'react';
import './App.css';
import BrandSelector from './components/BrandSelector';
import ChatInterface from './components/ChatInterface';
import ComponentPreview from './components/ComponentPreview';
import GitHubCommitModal from './components/GitHubCommitModal';
import GalleryPage from './components/GalleryPage';
import SettingsPage from './components/SettingsPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { extractComponentName } from './services/componentGenerator';
import { getBrandById } from './brands';

function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [selectedBrandId, setSelectedBrandId] = useLocalStorage('selectedBrandId', 'default');
  const [settings, setSettings] = useLocalStorage('settings', {});
  const [savedComponents, setSavedComponents] = useLocalStorage('savedComponents', []);
  const [currentCode, setCurrentCode] = useState('');
  const [currentBrand, setCurrentBrand] = useState(null);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [commitSuccess, setCommitSuccess] = useState(null);

  const handleComponentGenerated = (code, brand) => {
    setCurrentCode(code);
    setCurrentBrand(brand);
    setCommitSuccess(null);
  };

  const handleSaveComponent = () => {
    setShowCommitModal(true);
  };

  const handleCommitSuccess = (url) => {
    setShowCommitModal(false);
    setCommitSuccess(url);
    // Save to local session
    const name = extractComponentName(currentCode);
    setSavedComponents((prev) => [
      { name, code: currentCode, brandId: currentBrand?.id || selectedBrandId, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const handleSaveLocal = () => {
    if (!currentCode) return;
    const name = extractComponentName(currentCode);
    setSavedComponents((prev) => {
      const exists = prev.some((c) => c.name === name && c.code === currentCode);
      if (exists) return prev;
      return [
        { name, code: currentCode, brandId: currentBrand?.id || selectedBrandId, createdAt: Date.now() },
        ...prev,
      ];
    });
    alert(`Saved "${name}" to gallery!`);
  };

  const githubSettings = {
    token: settings?.githubToken,
    owner: settings?.githubOwner,
    repo: settings?.githubRepo,
    branch: settings?.githubBranch || 'main',
    componentsPath: settings?.componentsPath || 'components',
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__logo">📱</span>
          <div>
            <h1 className="app-header__title">RN Component Generator</h1>
            <p className="app-header__subtitle">Generate React Native components with natural language</p>
          </div>
        </div>
        <nav className="app-nav">
          <button
            className={`app-nav__tab ${activeTab === 'generator' ? 'active' : ''}`}
            onClick={() => setActiveTab('generator')}
          >
            ✨ Generator
          </button>
          <button
            className={`app-nav__tab ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            🖼️ Gallery
            {savedComponents.length > 0 && (
              <span className="app-nav__badge">{savedComponents.length}</span>
            )}
          </button>
          <button
            className={`app-nav__tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
            {(!settings?.openaiApiKey) && (
              <span className="app-nav__badge app-nav__badge--warn">!</span>
            )}
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'generator' && (
          <div className="generator">
            <div className="generator__toolbar">
              <div className="generator__brand-select">
                <label className="generator__label">Brand Theme:</label>
                <BrandSelector
                  selectedBrandId={selectedBrandId}
                  onSelectBrand={setSelectedBrandId}
                />
              </div>
              {currentCode && (
                <div className="generator__actions">
                  <button className="btn btn--ghost btn--sm" onClick={handleSaveLocal}>
                    💾 Save to Gallery
                  </button>
                  <button className="btn btn--primary btn--sm" onClick={handleSaveComponent}>
                    🐙 Commit to GitHub
                  </button>
                </div>
              )}
            </div>

            {commitSuccess && (
              <div className="generator__success">
                ✅ Component committed!{' '}
                <a href={commitSuccess} target="_blank" rel="noreferrer">View on GitHub ↗</a>
              </div>
            )}

            {!settings?.openaiApiKey && (
              <div className="generator__warning">
                ⚠️ No OpenAI API key configured.{' '}
                <button className="link-btn" onClick={() => setActiveTab('settings')}>
                  Add it in Settings →
                </button>
              </div>
            )}

            <div className="generator__layout">
              <div className="generator__chat">
                <ChatInterface
                  selectedBrandId={selectedBrandId}
                  onComponentGenerated={handleComponentGenerated}
                  apiKey={settings?.openaiApiKey}
                  model={settings?.openaiModel || 'gpt-4o-mini'}
                />
              </div>
              <div className="generator__preview">
                <ComponentPreview
                  code={currentCode}
                  brand={currentBrand || getBrandById(selectedBrandId)}
                  onSave={currentCode ? handleSaveComponent : null}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <GalleryPage
            githubSettings={githubSettings}
            savedComponents={savedComponents}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsPage settings={settings} onSave={setSettings} />
        )}
      </main>

      {showCommitModal && (
        <GitHubCommitModal
          code={currentCode}
          brand={currentBrand || getBrandById(selectedBrandId)}
          githubSettings={githubSettings}
          onClose={() => setShowCommitModal(false)}
          onSuccess={handleCommitSuccess}
        />
      )}
    </div>
  );
}

export default App;
