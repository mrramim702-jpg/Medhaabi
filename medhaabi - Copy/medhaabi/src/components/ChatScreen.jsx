import React, { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `তুমি "মেধাবী" — বাংলাদেশের এসএসসি ও এইচএসসি শিক্ষার্থীদের জন্য একজন বন্ধুসুলভ বাংলা এআই গৃহশিক্ষক।

তোমার বৈশিষ্ট্য:
- সবসময় বাংলায় কথা বলো
- একজন বড় ভাই/বোনের মতো আন্তরিক ও সহজ ভাষায় বোঝাও
- কঠিন বিষয় সহজ উদাহরণ দিয়ে বোঝাও
- পরীক্ষার চাপে থাকলে উৎসাহ দাও এবং মানসিক সহায়তা করো
- পড়ার কৌশল ও সময় ব্যবস্থাপনার পরামর্শ দাও
- কখনো প্রশ্ন ফাঁস বা "নিশ্চিত কমন" বিষয়ে কথা বলবে না
- শেখার প্রতি আগ্রহ তৈরি করো
- উত্তর দেওয়ার সময় ধাপে ধাপে বোঝাও`;

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'আস্সালামু আলাইকুম! 👋 আমি মেধাবী, তোমার এআই পড়ার বন্ধু। পরীক্ষার প্রস্তুতি, বোঝার সমস্যা বা মানসিক চাপ — যেকোনো বিষয়ে জিজ্ঞেস করো। আমি সবসময় পাশে আছি! 📚',
};

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
      <div style={{ width: 30, height: 30, borderRadius: 10, background: 'linear-gradient(135deg,#6C63FF,#FF6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🎓</div>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center', background: '#1E1E30', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px 18px 18px 4px', padding: '12px 16px' }}>
        {[0, 1, 2].map((n) => (
          <div key={n} style={{ width: 7, height: 7, borderRadius: '50%', background: '#6C63FF', animation: `bounce 1.2s ease-in-out ${n * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

export default function ChatScreen() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.map((b) => b.text || '').join('') || 'দুঃখিত, উত্তর পেতে সমস্যা হয়েছে।';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'ইন্টারনেট সংযোগ সমস্যা। একটু পরে আবার চেষ্টা করো।' }]);
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className="fade-in"
            style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10, gap: 8, alignItems: 'flex-end' }}
          >
            {msg.role === 'assistant' && (
              <div style={{ width: 30, height: 30, borderRadius: 10, background: 'linear-gradient(135deg,#6C63FF,#FF6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🎓</div>
            )}
            <div style={{
              maxWidth: '82%',
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? 'linear-gradient(135deg,#6C63FF,#5558DD)' : '#1E1E30',
              color: '#E8E8F0',
              fontSize: 14.5,
              lineHeight: 1.6,
              border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.06)' : 'none',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', background: '#13131F', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <input
          style={{ flex: 1, background: '#1E1E30', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 22, padding: '10px 16px', color: '#E8E8F0', fontSize: 15, outline: 'none' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="যেকোনো প্রশ্ন করো..."
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{ background: loading ? '#333' : 'linear-gradient(135deg,#6C63FF,#FF6584)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: loading ? 'not-allowed' : 'pointer', flexShrink: 0, transition: 'background 0.2s' }}
          aria-label="পাঠাও"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>

      <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}`}</style>
    </div>
  );
}
