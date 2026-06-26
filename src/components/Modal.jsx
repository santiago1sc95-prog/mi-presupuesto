export default function Modal({ title, onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: '#000000CC',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#111', borderTop: '1px solid #2E2E2E',
          borderRadius: '20px 20px 0 0', padding: '24px 20px 48px',
          width: '100%', maxWidth: 480,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export const inputStyle = {
  width: '100%', background: '#1A1A1A', border: '1px solid #2E2E2E',
  borderRadius: 10, padding: '11px 13px', color: '#E8E8E8',
  fontSize: 14, outline: 'none', boxSizing: 'border-box',
}

export const labelStyle = {
  fontSize: 11, color: '#666', marginBottom: 5,
  display: 'block', letterSpacing: '0.5px',
}

export const primaryBtn = {
  width: '100%', background: '#fff', color: '#0A0A0A',
  border: 'none', borderRadius: 12, padding: 13,
  fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 4,
}
