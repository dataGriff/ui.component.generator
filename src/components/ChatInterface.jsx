import { useState, useRef, useEffect } from 'react';
import { generateComponent } from '../services/componentGenerator';
import { getBrandById } from '../brands';

export default function ChatInterface({ selectedBrandId, onComponentGenerated, apiKey, model }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your React Native component generator. Describe the component you'd like to create and I'll generate it with your selected brand applied.\n\nTry something like:\n• \"A primary button with loading state\"\n• \"A user profile card with avatar and bio\"\n• \"A search bar with clear button\"",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const brand = getBrandById(selectedBrandId);
      const conversationMessages = newMessages.filter((m, i) => i > 0);
      const code = await generateComponent(conversationMessages, brand, apiKey, model);

      const assistantMessage = {
        role: 'assistant',
        content: code,
        isCode: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      onComponentGenerated(code, brand);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRefine = async (refinement) => {
    const text = refinement.trim();
    if (!text || loading) return;
    setInput(text);
  };

  return (
    <div className="chat">
      <div className="chat__messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat__message chat__message--${msg.role}`}>
            <div className="chat__avatar">
              {msg.role === 'assistant' ? '🤖' : '👤'}
            </div>
            <div className="chat__bubble">
              {msg.isCode ? (
                <div className="chat__code-notice">
                  ✅ Component generated! View the code and preview on the right.
                  <br />
                  <small>You can ask me to refine it with a follow-up message.</small>
                </div>
              ) : (
                <pre className="chat__text">{msg.content}</pre>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat__message chat__message--assistant">
            <div className="chat__avatar">🤖</div>
            <div className="chat__bubble chat__bubble--loading">
              <span className="chat__dot" />
              <span className="chat__dot" />
              <span className="chat__dot" />
            </div>
          </div>
        )}
        {error && (
          <div className="chat__error">
            ⚠️ {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat__suggestions">
        {['Primary button with loading state', 'User profile card', 'Search bar with clear button'].map((s) => (
          <button key={s} className="chat__suggestion" onClick={() => handleRefine(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="chat__input-area">
        <textarea
          ref={textareaRef}
          className="chat__input"
          placeholder="Describe the React Native component you want to create..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          disabled={loading}
        />
        <button
          className="chat__send"
          onClick={handleSend}
          disabled={!input.trim() || loading}
        >
          {loading ? (
            <svg className="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
