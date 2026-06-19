import React, { useState } from 'react';
import { SUBJECTS } from '../data/chapters';

const SYSTEM_PROMPT = `তুমি "মেধাবী" — বাংলাদেশের এসএসসি ও এইচএসসি শিক্ষার্থীদের জন্য একজন বন্ধুসুলভ বাংলা এআই গৃহশিক্ষক।`;

export default function PlannerScreen() {
  const [examDate, setExamDate] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  function toggleSubject(name) {
    setSelectedSubjects((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  async function generatePlan() {
    if (!examDate) return;
    const days = Math.max(1, Math.round((new Date(examDate) - new Date()) / 86400000));
    setLoading(true);
    setPlan('');

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
          messages: [{
            role: 'user',
            content: `পরীক্ষা ${days} দিন বাকি আছে। ${selectedSubjects.length > 0 ? `বিষয়গুলো: ${selectedSubjects.join(', ')}।` : ''} আমাকে একটি সহজ ও কার্যকর ৭ দিনের স্টাডি প্ল্যান তৈরি করে দাও। প্রতিদিনের জন্য নির্দিষ্ট বিষয় ও সময় উল্লেখ করো। সংক্ষিপ্ত ও বাস্তবসম্মত করো।`,
          }],
        }),
      });
      const data = await res.json();
      setPlan(data.content?.map((b) => b.text || '').join('') || 'প্ল্যান তৈরিতে সমস্যা হয়েছে।');
    } catch {
      setPlan('ইন্টারনেট সমস্যা। একটু পরে চেষ্টা করো।');
    }
    setLoading(false);
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ padding: '16px 16px 8px', flex: 1, overflowY: 'auto' }}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>স্টাডি প্ল্যানার</div>
      <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>পরীক্ষার তারিখ জানাও, প্ল্যান পাও</div>

      <div style={{ background: '#1A1A2E', borderRadius: 16, padding: '18px 16px', border: '1px solid rgba(108,99,255,0.2)', marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 8, fontWeight: 600 }}>পরীক্ষার তারিখ</div>
        <input
          type="date"
          value={examDate}
          min={today}
          onChange={(e) => setExamDate(e.target.value)}
          style={{ width: '100%', background: '#1E1E30', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 12, padding: '11px 14px', color: '#E8E8F0', fontSize: 15, outline: 'none', marginBottom: 16, boxSizing: 'border-box' }}
        />

        <div style={{ fontSize: 13, color: '#888', marginBottom: 10, fontWeight: 600 }}>বিষয় বেছে নাও (ঐচ্ছিক)</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          {SUBJECTS.map((s) => {
            const active = selectedSubjects.includes(s.name);
            return (
              <div
                key={s.id}
                onClick={() => toggleSubject(s.name)}
                style={{ padding: '6px 12px', borderRadius: 20, border: `1px solid ${active ? '#6C63FF' : 'rgba(255,255,255,0.12)'}`, background: active ? 'rgba(108,99,255,0.12)' : 'transparent', cursor: 'pointer', fontSize: 13, color: active ? '#6C63FF' : '#aaa', transition: 'all 0.2s' }}
              >
                {s.icon} {s.name}
              </div>
            );
          })}
        </div>

        <button
          onClick={generatePlan}
          disabled={!examDate || loading}
          style={{ background: !examDate || loading ? '#333' : 'linear-gradient(135deg,#6C63FF,#5558DD)', border: 'none', borderRadius: 12, padding: '13px 20px', fontSize: 15, color: '#fff', cursor: !examDate || loading ? 'not-allowed' : 'pointer', width: '100%', fontWeight: 600, transition: 'background 0.2s' }}
        >
          {loading ? 'তৈরি হচ্ছে... ⏳' : 'AI প্ল্যান তৈরি করো 🚀'}
        </button>
      </div>

      {plan && (
        <div className="fade-in" style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)', borderRadius: 16, padding: '18px 16px', border: '1px solid rgba(108,99,255,0.3)' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#6C63FF', marginBottom: 12 }}>📅 তোমার স্টাডি প্ল্যান</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.85, color: '#ddd', whiteSpace: 'pre-wrap' }}>{plan}</div>
        </div>
      )}
    </div>
  );
}
