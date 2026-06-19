import React, { useState } from 'react';
import { SUBJECTS } from '../data/chapters';
import MCQ_DATA from '../data/mcq';

const LABELS = ['ক', 'খ', 'গ', 'ঘ'];

function SubjectPicker({ onSelect }) {
  return (
    <div style={{ padding: '16px 16px 8px', flex: 1, overflowY: 'auto' }}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>MCQ প্র্যাকটিস</div>
      <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>বিষয় বেছে শুরু করো</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {SUBJECTS.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelect(s.id)}
            style={{ background: '#1A1A2E', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 14, padding: '16px 12px', cursor: 'pointer', textAlign: 'center', transition: 'border-color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6C63FF'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(108,99,255,0.2)'}
          >
            <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>{MCQ_DATA[s.id]?.length || 0} প্রশ্ন</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultScreen({ score, total, subjectId, onRetry, onBack }) {
  const passed = score >= total * 0.7;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{passed ? '🎉' : '💪'}</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{passed ? 'অসাধারণ!' : 'আরো চেষ্টা করো!'}</div>
      <div style={{ fontSize: 16, color: '#aaa', marginBottom: 32 }}>
        {total} প্রশ্নের মধ্যে <span style={{ color: '#43C6AC', fontWeight: 700 }}>{score}টি</span> সঠিক
      </div>
      <div style={{ display: 'flex', gap: 12, width: '100%' }}>
        <button onClick={onBack} style={{ flex: 1, background: '#1E1E30', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 12, padding: '12px', fontSize: 14, color: '#E8E8F0', cursor: 'pointer' }}>
          অন্য বিষয়
        </button>
        <button onClick={onRetry} style={{ flex: 1, background: 'linear-gradient(135deg,#6C63FF,#5558DD)', border: 'none', borderRadius: 12, padding: '12px', fontSize: 14, color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          আবার চেষ্টা
        </button>
      </div>
    </div>
  );
}

export default function MCQScreen() {
  const [subjectId, setSubjectId] = useState(null);
  const [state, setState] = useState({ idx: 0, selected: null, answered: false, score: 0, finished: false });

  function startQuiz(id) {
    setSubjectId(id);
    setState({ idx: 0, selected: null, answered: false, score: 0, finished: false });
  }

  function handleAnswer(optIdx) {
    if (state.answered) return;
    const correct = MCQ_DATA[subjectId][state.idx].ans === optIdx;
    setState((prev) => ({ ...prev, selected: optIdx, answered: true, score: correct ? prev.score + 1 : prev.score }));
  }

  function nextQuestion() {
    const questions = MCQ_DATA[subjectId];
    if (state.idx + 1 >= questions.length) {
      setState((prev) => ({ ...prev, finished: true }));
    } else {
      setState((prev) => ({ ...prev, idx: prev.idx + 1, selected: null, answered: false }));
    }
  }

  if (!subjectId) return <SubjectPicker onSelect={startQuiz} />;

  const questions = MCQ_DATA[subjectId];

  if (state.finished) {
    return (
      <ResultScreen
        score={state.score}
        total={questions.length}
        subjectId={subjectId}
        onRetry={() => startQuiz(subjectId)}
        onBack={() => setSubjectId(null)}
      />
    );
  }

  const question = questions[state.idx];

  return (
    <div style={{ padding: '16px 16px 8px', flex: 1, overflowY: 'auto' }}>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#888' }}>
          {SUBJECTS.find((s) => s.id === subjectId)?.name}
        </div>
        <div style={{ fontSize: 13, color: '#6C63FF', fontWeight: 600 }}>
          {state.idx + 1} / {questions.length}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, borderRadius: 2, background: '#2A2A3E', marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((state.idx + 1) / questions.length) * 100}%`, background: '#6C63FF', borderRadius: 2, transition: 'width 0.4s' }} />
      </div>

      {/* Question */}
      <div style={{ background: '#1A1A2E', borderRadius: 16, padding: '16px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16 }}>
        <div style={{ fontSize: 15, lineHeight: 1.7, fontWeight: 500 }}>{question.q}</div>
      </div>

      {/* Options */}
      {question.opts.map((opt, i) => {
        let borderColor = 'rgba(255,255,255,0.08)';
        let bg = '#1E1E30';
        let color = '#E8E8F0';

        if (state.answered) {
          if (i === question.ans) { borderColor = '#43C6AC'; bg = 'rgba(67,198,172,0.12)'; color = '#43C6AC'; }
          else if (i === state.selected) { borderColor = '#FF6584'; bg = 'rgba(255,101,132,0.12)'; color = '#FF6584'; }
        }

        return (
          <div
            key={i}
            onClick={() => handleAnswer(i)}
            style={{ background: bg, border: `1px solid ${borderColor}`, borderRadius: 12, padding: '12px 14px', cursor: state.answered ? 'default' : 'pointer', marginBottom: 8, fontSize: 14, color, transition: 'all 0.2s' }}
          >
            <span style={{ marginRight: 8, opacity: 0.6 }}>{LABELS[i]})</span>{opt}
          </div>
        );
      })}

      {/* Explanation */}
      {state.answered && (
        <div className="fade-in">
          <div style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 12, padding: '12px', marginTop: 4, marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>
              💡 <strong style={{ color: '#6C63FF' }}>ব্যাখ্যা:</strong> {question.explanation}
            </div>
          </div>
          <button
            onClick={nextQuestion}
            style={{ background: 'linear-gradient(135deg,#6C63FF,#5558DD)', border: 'none', borderRadius: 12, padding: '13px', width: '100%', fontSize: 15, color: '#fff', cursor: 'pointer', fontWeight: 600 }}
          >
            {state.idx + 1 < questions.length ? 'পরবর্তী প্রশ্ন →' : 'ফলাফল দেখো →'}
          </button>
        </div>
      )}
    </div>
  );
}
