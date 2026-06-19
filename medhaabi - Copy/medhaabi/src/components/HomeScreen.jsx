import React from 'react';

const FEATURES = [
  { icon: '💬', title: 'AI চ্যাট',            desc: 'যেকোনো প্রশ্ন করো',    screen: 'chat',     color: '#6C63FF' },
  { icon: '📊', title: 'গুরুত্বপূর্ণ অধ্যায়', desc: 'বোর্ড প্রশ্ন বিশ্লেষণ', screen: 'chapters', color: '#FF6584' },
  { icon: '✏️', title: 'MCQ প্র্যাকটিস',      desc: 'নিজেকে পরীক্ষা করো',  screen: 'mcq',      color: '#43C6AC' },
  { icon: '📅', title: 'স্টাডি প্ল্যানার',    desc: 'রুটিন বানাও',          screen: 'planner',  color: '#F7971E' },
];

const s = {
  body: { padding: '16px 16px 8px', flex: 1, overflowY: 'auto' },
  welcomeCard: {
    background: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    borderRadius: 16, padding: '18px 16px',
    border: '1px solid rgba(108,99,255,0.4)', marginBottom: 16,
  },
  label: { fontSize: 13, color: '#888', marginBottom: 10, fontWeight: 600, letterSpacing: 1 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 },
  featCard: {
    background: '#1A1A2E', borderRadius: 14, padding: '16px 12px',
    border: '1px solid rgba(108,99,255,0.2)', cursor: 'pointer',
    textAlign: 'center', transition: 'border-color 0.2s',
  },
  tipCard: {
    background: 'rgba(67,198,172,0.08)',
    border: '1px solid rgba(67,198,172,0.2)',
    borderRadius: 14, padding: '12px 14px',
  },
};

export default function HomeScreen({ onNavigate }) {
  return (
    <div style={s.body}>
      <div style={s.welcomeCard}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>👋</div>
        <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>স্বাগতম!</div>
        <div style={{ fontSize: 14, color: '#aaa', lineHeight: 1.6 }}>
          পরীক্ষার প্রস্তুতিতে আমি তোমার সেরা বন্ধু। যেকোনো প্রশ্ন করো, MCQ প্র্যাকটিস করো, স্টাডি প্ল্যান বানাও।
        </div>
      </div>

      <div style={s.label}>দ্রুত শুরু করো</div>

      <div style={s.grid}>
        {FEATURES.map((f) => (
          <div
            key={f.screen}
            style={s.featCard}
            onClick={() => onNavigate(f.screen)}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = f.color}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(108,99,255,0.2)'}
          >
            <div style={{ fontSize: 26, marginBottom: 6 }}>{f.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 13, color: f.color, marginBottom: 3 }}>{f.title}</div>
            <div style={{ fontSize: 11, color: '#888' }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <div style={s.tipCard}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 22 }}>💡</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#43C6AC', marginBottom: 4 }}>আজকের টিপস</div>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>
              পড়ার ২৫ মিনিট পর ৫ মিনিট বিরতি নাও। এই "পমোডোরো" পদ্ধতি মনোযোগ বাড়ায়! 🍅
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
