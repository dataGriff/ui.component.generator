import { useState, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getBrandById } from '../brands';
import React from 'react';
import * as RN from 'react-native-web';
import { transform } from '@babel/standalone';

/**
 * Attempt to render the generated React Native code as a live preview
 * using react-native-web.  We dynamically import react-native-web primitives
 * and evaluate the component string so it can render in the browser.
 */
function LivePreview({ code }) {
  const { element, error } = useMemo(() => {
    try {
      // Strip import/export statements so we can eval the component body
      let transformed = code
        // Remove ```jsx / ``` markdown fences if present
        .replace(/^```\w*\s*/gm, '')
        .replace(/```\s*$/gm, '')
        // Remove import lines (handles multiline imports too)
        .replace(/^import\s[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
        .replace(/^import\s+['"][^'"]+['"];?\s*$/gm, '')
        // "export default function Xxx" → "function Xxx"
        .replace(/export\s+default\s+function\s+/g, 'function ')
        // "export default const Xxx" → "const Xxx"  (uncommon but possible)
        .replace(/export\s+default\s+const\s+/g, 'const ')
        // "export default Xxx;"  at end of file
        .replace(/export\s+default\s+(\w+)\s*;?\s*$/gm, '')
        // "export { Xxx as default };"
        .replace(/export\s*\{[^}]*\}\s*;?/g, '')
        // Remove PropTypes assignments (e.g., "SearchBar.propTypes = { ... };")
        .replace(/\w+\.propTypes\s*=\s*\{[\s\S]*?\};\s*/g, '')
        // Remove defaultProps assignments
        .replace(/\w+\.defaultProps\s*=\s*\{[\s\S]*?\};\s*/g, '');

      // Detect component name using multiple patterns
      let componentName = null;

      // Pattern 1: "function ComponentName("
      const fnMatch = transformed.match(/function\s+([A-Z]\w*)\s*\(/);
      if (fnMatch) componentName = fnMatch[1];

      // Pattern 2: "const ComponentName = (" or "const ComponentName = () =>"
      if (!componentName) {
        const arrowMatch = transformed.match(/const\s+([A-Z]\w*)\s*=\s*\(?/);
        if (arrowMatch) componentName = arrowMatch[1];
      }

      // Pattern 3: fallback
      if (!componentName) {
        const anyFn = transformed.match(/(?:function|const|let|var)\s+([A-Z]\w*)/);
        if (anyFn) componentName = anyFn[1];
      }

      if (!componentName) {
        return { element: null, error: 'Could not detect a named component function in the generated code.' };
      }

      // Wrap in a function so Babel doesn't complain about top-level return,
      // then transpile JSX → React.createElement calls
      const wrappedCode = `function __preview__(React, RN) {
        const { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput,
                FlatList, Pressable, ActivityIndicator, Switch, Platform, Dimensions,
                ImageBackground, SafeAreaView, StatusBar, Modal, Alert,
                Animated, Easing, LayoutAnimation, KeyboardAvoidingView,
                SectionList, VirtualizedList, Linking, PixelRatio, AppState,
                useWindowDimensions, useColorScheme } = RN;
        const { useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer } = React;
        // Mock PropTypes so generated code with .propTypes doesn't crash
        var PropTypes = { string: 0, number: 0, bool: 0, func: 0, object: 0, array: 0,
          node: 0, element: 0, any: 0, symbol: 0, shape: function(){return 0;},
          arrayOf: function(){return 0;}, objectOf: function(){return 0;},
          oneOf: function(){return 0;}, oneOfType: function(){return 0;},
          instanceOf: function(){return 0;}, isRequired: 0 };
        ${transformed}
        return React.createElement(${componentName});
      }`;

      const { code: compiledCode } = transform(wrappedCode, {
        presets: ['react'],
        filename: 'component.jsx',
      });

      // Evaluate the transpiled code, then call __preview__
      const exec = new Function('React', 'RN', compiledCode + '\nreturn __preview__(React, RN);');
      const el = exec(React, RN);
      return { element: el, error: null };
    } catch (err) {
      return { element: null, error: err.message };
    }
  }, [code]);

  if (error) {
    return (
      <div className="preview__live-error">
        <strong>Preview unavailable</strong>
        <p>{error}</p>
        <p style={{ fontSize: 12, color: '#64748B' }}>Switch to the Code tab to see the generated source.</p>
      </div>
    );
  }

  return (
    <div className="preview__live-frame">
      <div className="preview__phone-bezel">
        {element}
      </div>
    </div>
  );
}

/** Error boundary so preview crashes don't blank the whole page */
class PreviewErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error: error.message };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      this.setState({ error: null });
    }
  }
  render() {
    if (this.state.error) {
      return (
        <div className="preview__live-error">
          <strong>Preview crashed</strong>
          <p>{this.state.error}</p>
          <p style={{ fontSize: 12, color: '#64748B' }}>Switch to the Code tab to see the generated source.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ComponentPreview({ code, brand: brandProp, onSave }) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState('preview');  // 'code' | 'preview'
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
          <div className="preview__tabs">
            <button
              className={`preview__tab ${tab === 'preview' ? 'preview__tab--active' : ''}`}
              onClick={() => setTab('preview')}
            >
              👁️ Preview
            </button>
            <button
              className={`preview__tab ${tab === 'code' ? 'preview__tab--active' : ''}`}
              onClick={() => setTab('code')}
            >
              💻 Code
            </button>
          </div>
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

      {tab === 'preview' ? (
        <PreviewErrorBoundary code={code}>
          <LivePreview code={code} />
        </PreviewErrorBoundary>
      ) : (
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
      )}
    </div>
  );
}
