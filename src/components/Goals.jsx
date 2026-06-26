import { fmt } from '../utils/helpers'

export default function Goals({ goals, setGoals, showToast, onAdd, onContribute }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Metas de ahorro</div>
        <button onClick={onAdd} style={{ background: '#fff', color: '#0A0A0A', border: 'none', borderRadius: 9, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Nueva</button>
      </div>

      {goals.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#666' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
          <div style={{ fontSize: 14 }}>Sin metas todavía</div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {goals.map(g => {
          const pct = Math.min(Math.round((g.saved / g.target) * 100), 100)
          const done = pct >= 100
          return (
            <div key={g.id} style={{ background: '#111', border: `1px solid ${done ? '#3A3A3A' : '#2E2E2E'}`, borderRadius: 16, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{g.emoji} {g.name}</div>
                  {g.deadline && <div style={{ fontSize: 11, color: '#666', marginTop: 3 }}>Límite: {g.deadline}</div>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#E8E8E8' }}>{pct}%</span>
                  <button onClick={() => { setGoals(p => p.filter(x => x.id !== g.id)); showToast('Meta eliminada') }}
                    style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 19, lineHeight: 1 }}>×</button>
                </div>
              </div>

              <div style={{ height: 4, background: '#1A1A1A', borderRadius: 99, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: '#fff', borderRadius: 99, transition: 'width 0.5s' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#666' }}>{fmt(g.saved)} / {fmt(g.target)}</span>
                {!done
                  ? <button onClick={() => onContribute(g)} style={{ background: '#1A1A1A', color: '#E8E8E8', border: '1px solid #3A3A3A', borderRadius: 8, padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Aportar</button>
                  : <span style={{ fontSize: 12, color: '#E8E8E8', fontWeight: 700 }}>¡Cumplida! 🎉</span>
                }
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
