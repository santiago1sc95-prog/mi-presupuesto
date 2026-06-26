import { useState } from 'react'
import { askClaude } from '../utils/ai'

const QUICK = ['¿En qué gasté más?', '¿Cómo va mi balance?', 'Dame un consejo de ahorro', '¿Voy bien con mis metas?']

export default function AIChat({ financialContext }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hola. Tengo tus datos de este mes listos. ¿Qué quieres saber?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    const next = [...messages, { role: 'user', content: msg }]
    setMessages(next)
    setLoading(true)
    try {
      const reply = await askClaude(next, financialContext)
      setMessages(p => [...p, { role: 'assistant', content: reply }])
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: 'Error conectando. Verifica tu conexión.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)' }}>
      <div style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Finn IA</span>
        <span style={{ fontSize: 12, color: '#666', marginLeft: 8 }}>Analiza tus finanzas</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role === 'assistant' && (
              <div style={{ marginRight: 6, fontSize: 10, color: '#666', alignSelf: 'flex-end', marginBottom: 2, letterSpacing: 1 }}>FINN</div>
            )}
            <div style={{
              maxWidth: '82%', padding: '9px 12px', fontSize: 13, lineHeight: 1.6,
              color: m.role === 'user' ? '#0A0A0A' : '#E8E8E8',
              background: m.role === 'user' ? '#fff' : '#111',
              border: m.role === 'assistant' ? '1px solid #2E2E2E' : 'none',
              borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '4px 14px 14px 14px',
              fontWeight: m.role === 'user' ? 500 : 400,
              whiteSpace: 'pre-wrap',
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex' }}>
            <div style={{ background: '#111', border: '1px solid #2E2E2E', borderRadius: '4px 14px 14px 14px', padding: '9px 12px', fontSize: 13, color: '#666' }}>
              Analizando...
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {QUICK.map(s => (
            <button key={s} onClick={() => send(s)}
              style={{ background: '#1A1A1A', color: '#999', border: '1px solid #2E2E2E', borderRadius: 99, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Pregúntale a Finn..."
          style={{ flex: 1, background: '#1A1A1A', border: '1px solid #3A3A3A', borderRadius: 12, padding: '11px 14px', color: '#E8E8E8', fontSize: 14, outline: 'none' }}
        />
        <button onClick={() => send()} disabled={loading || !input.trim()}
          style={{ background: '#fff', color: '#0A0A0A', border: 'none', borderRadius: 12, padding: '11px 18px', fontWeight: 700, fontSize: 16, cursor: 'pointer', opacity: (!input.trim() || loading) ? 0.3 : 1 }}>
          ↑
        </button>
      </div>
    </div>
  )
}
