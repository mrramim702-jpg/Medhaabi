import React from 'react';

export default function Header() {
  const s = {
    header: {
      background: '#1a1a2e',
      padding: '14px 20px 12px',
      borderBottom: '1px solid rgba(108,99,255,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    logo: {
      width: 38, height: 38, borderRadius: 12,
      background: 'linear-gradient(135deg,#6C63FF,#FF6584)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 20, flexShrink: 0,
    },
    title: {
      fontSize: 18, fontWeight: 700,
      background: 'linear-gradient(90deg,#6C63FF,#FF6584)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    },
    sub: { fontSize: 11, color: '#888' },
    badge: {
      marginLeft: 'auto',
      background: '#6C63FF22', border: '1px solid #6C63FF44',
      borderRadius: 20, padding: '3px 10px',
      fontSize: 11, color: '#6C63FF',
    },
  };

  return (
    <header style={s.header}>
      <div style={s.logo}>🎓</div>
      <div>
        <div style={s.title}>মেধাবী</div>
        <div style={s.sub}>তোমার এআই পড়ার বন্ধু</div>
      </div>
      <div style={s.badge}>SSC / HSC</div>
    </header>
  );
}
