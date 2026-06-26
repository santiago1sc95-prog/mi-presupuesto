import { useState } from 'react'
import Modal, { inputStyle, labelStyle, primaryBtn } from './Modal'
import { todayStr, fmt } from '../utils/helpers'

// ── Add Transaction ────────────────────────────────────────────────────────────
export function AddTxModal({ categories, onClose, onSave }) {
  const [type, setType]   = useState('expense')
  const [amount, setAmount] = useState('')
  const [catId, setCatId]   = useState('c1')
  const [note, setNote]     = useState('')
  const [date, setDate]     = useState(todayStr())

  const cats = type === 'income'
    ? categories.filter(c => c.id === 'income')
    : categories.filter(c => c.id !== 'income')

  return (
    <Modal title="Nueva transacción" onClose={onClose}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['expense', 'income'].map(t => (
          <button key={t}
            onClick={() => { setType(t); setCatId(t === 'income' ? 'income' : 'c1') }}
            style={{ flex: 1, padding: 10, borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
              background: type === t ? '#fff' : '#1A1A1A',
              color: type === t ? '#0A0A0A' : '#666',
            }}>
            {t === 'income' ? '↑ Ingreso' : '↓ Gasto'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={labelStyle}>Monto (COP)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Categoría</label>
          <select value={catId} onChange={e => setCatId(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {cats.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Nota (opcional)</label>
          <input value={note} onChange={e => setNote(e.target.value)} placeholder="ej: Almuerzo, Uber..." style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Fecha</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
        </div>
        <button onClick={() => { if (!amount || isNaN(+amount)) return; onSave({ type, amount: +amount, categoryId: catId, note, date }) }}
          style={primaryBtn}>
          Guardar
        </button>
      </div>
    </Modal>
  )
}

// ── Add Goal ───────────────────────────────────────────────────────────────────
export function AddGoalModal({ onClose, onSave }) {
  const [name, setName]       = useState('')
  const [target, setTarget]   = useState('')
  const [deadline, setDeadline] = useState('')
  const [emoji, setEmoji]     = useState('🎯')

  const EMOJIS = ['🎯','🏠','✈️','🚗','💻','📱','🎓','💍','🌴','💰','🛍️','🎸']

  return (
    <Modal title="Nueva meta de ahorro" onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={labelStyle}>Emoji</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setEmoji(e)}
                style={{ fontSize: 22, background: emoji === e ? '#fff' : '#1A1A1A', border: `1px solid ${emoji === e ? '#fff' : '#2E2E2E'}`, borderRadius: 8, padding: '4px 8px', cursor: 'pointer' }}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Nombre</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="ej: Viaje a Cartagena" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Monto objetivo (COP)</label>
          <input type="number" value={target} onChange={e => setTarget(e.target.value)} placeholder="0" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Fecha límite (opcional)</label>
          <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} style={inputStyle} />
        </div>
        <button onClick={() => { if (!name || !target) return; onSave({ name, target: +target, deadline, emoji }) }}
          style={primaryBtn}>
          Crear meta
        </button>
      </div>
    </Modal>
  )
}

// ── Contribute to Goal ─────────────────────────────────────────────────────────
export function ContributeModal({ goal, onClose, onSave }) {
  const [amount, setAmount] = useState('')
  const remaining = goal.target - goal.saved

  return (
    <Modal title={`Aportar a "${goal.name}"`} onClose={onClose}>
      <div style={{ background: '#1A1A1A', borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 13, color: '#666' }}>
        Faltan <strong style={{ color: '#E8E8E8' }}>{fmt(remaining)}</strong> para completar esta meta
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={labelStyle}>Monto a aportar (COP)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" style={inputStyle} />
        </div>
        <button onClick={() => { if (!amount || isNaN(+amount)) return; onSave(+amount) }} style={primaryBtn}>
          Registrar aporte
        </button>
      </div>
    </Modal>
  )
}
