import React from 'react';

const NAV_ITEMS = [
  { id: 'home',     icon: '🏠', label: 'হোম'   },
  { id: 'chat',     icon: '💬', label: 'চ্যাট'  },
  { id: 'chapters', icon: '📊', label: 'অধ্যায়' },
  { id: 'mcq',      icon: '✏️', label: 'MCQ'   },
  { id: 'planner',  icon: '📅', label: 'প্ল্যান' },
];

export default function BottomNav({ screen, onNavigate }) {
  return (
    <nav style={{
      display: 'flex',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      background: '#13131F',
      position: 'sticky',
      bottom: 0,
      zIndex: 100,
    }}>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          style={{
            flex: 1,
            padding: '10px 4px 8px',
            background: 'none',
            border: 'none',
            color: screen === item.id ? '#6C63FF' : '#666',
            fontSize: 10,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            transition: 'color 0.2s',
          }}
        >
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
