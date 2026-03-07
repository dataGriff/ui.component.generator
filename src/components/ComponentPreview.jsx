import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getBrandById } from '../brands';

export default function ComponentPreview({ code, brand: brandProp, onSave }) {
  const [copied, setCopied] = useState(false);
  const brand = brandProp || getBrandById('default');
  const isDark = brand.colors.background === '#0F172A' || brand.colors.background === '#0A0A0A';

  const handleCopy = () => {
    navigator.clipboard.writeText(code || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!code) {
    return (
      <div className="preview preview--empty">
        <div className="preview__empty-icon">📱</div>
        <h3>No component yet</h3>
        <p>Describe a React Native component in the chat to generate one here.</p>
      </div>
    );
  }

  return (
    <div className="preview">
      <div className="preview__header">
        <span className="preview__title">Generated Component</span>
        <div className="preview__actions">
          <button className="btn btn--sm btn--ghost" onClick={handleCopy}>
            {copied ? '✅ Copied' : '📋 Copy'}
          </button>
          {onSave && (
            <button className="btn btn--sm btn--primary" onClick={onSave}>
              💾 Save & Commit
            </button>
          )}
        </div>
      </div>

      <div className="preview__brand-badge" style={{ background: brand.colors.primary }}>
        <span>Brand: {brand.name}</span>
        <span className="preview__brand-colors">
          {Object.entries(brand.colors).slice(0, 5).map(([key, val]) => (
            <span
              key={key}
              className="preview__color-dot"
              style={{ background: val }}
              title={`${key}: ${val}`}
            />
          ))}
        </span>
      </div>

      <div className="preview__code">
        <SyntaxHighlighter
          language="javascript"
          style={isDark ? oneDark : oneLight}
          showLineNumbers
          customStyle={{ margin: 0, borderRadius: '0 0 8px 8px', fontSize: '13px' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
