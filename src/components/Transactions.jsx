import { fmt } from '../utils/helpers'

export default function Transactions({ monthTx, transactions, setTransactions, categories, showToast, onAdd }) {
  const sorted = [...monthTx].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Movimientos</div>
        <button onClick={onAdd} style={{ background: '#fff', color: '#0A0A0A', border: 'none', borderRadius: 9, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Agregar</button>
      </div>

      {sorted.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#666' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 14 }}>Sin movimientos este mes</div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sorted.map(tx => {
          const cat = categories.find(c => c.id === tx.categoryId)
          return (
            <div key={tx.id} style={{ background: '#111', border: '1px solid #2E2E2E', borderRadius: 13, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{cat?.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#E8E8E8' }}>{tx.note || cat?.name}</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{cat?.name} · {tx.date}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: tx.type === 'income' ? '#E8E8E8' : '#888' }}>
                  {tx.type === 'income' ? '+' : '−'}{fmt(tx.amount)}
                </span>
                <button
                  onClick={() => { setTransactions(p => p.filter(t => t.id !== tx.id)); showToast('Eliminado') }}
                  style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 19, lineHeight: 1, padding: 0 }}
                >×</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
