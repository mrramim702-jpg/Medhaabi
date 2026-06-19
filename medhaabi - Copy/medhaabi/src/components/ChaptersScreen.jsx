import React, { useState } from 'react';
import { SUBJECTS, IMPORTANT_CHAPTERS } from '../data/chapters';

export default function ChaptersScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ padding: '16px 16px 8px', flex: 1, overflowY: 'auto' }}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>গুরুত্বপূর্ণ অধ্যায়</div>
      <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>গত ১০ বছরের বোর্ড প্রশ্ন বিশ্লেষণ</div>

      <div style={{ fontSize: 13, color: '#888', marginBottom: 10, fontWeight: 600 }}>বিষয় বেছে নাও</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {SUBJECTS.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              background: selected === s.id ? 'rgba(108,99,255,0.12)' : '#1A1A2E',
              border: `1px solid ${selected === s.id ? '#6C63FF' : 'rgba(108,99,255,0.2)'}`,
              borderRadius: 14, padding: '14px 12px', cursor: 'pointer', textAlign: 'center',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
          </div>
        ))}
      </div>

      {selected && IMPORTANT_CHAPTERS[selected] && (
        <div className="fade-in">
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
            {SUBJECTS.find((s) => s.id === selected)?.name} — অধ্যায়ভিত্তিক সম্ভাবনা
          </div>

          {IMPORTANT_CHAPTERS[selected].map((ch, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13 }}>{ch.name}</span>
                <span style={{ fontSize: 13, color: ch.color, fontWeight: 600 }}>{ch.percent}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: '#2A2A3E', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${ch.percent}%`, background: ch.color, borderRadius: 4, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          ))}

          <div style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 12, padding: '10px 12px', marginTop: 8 }}>
            <div style={{ fontSize: 12, color: '#888' }}>
              ⚠️ এটি বিশ্লেষণভিত্তিক অনুমান। সব অধ্যায় ভালোভাবে পড়ো।
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
