import { PieChart, Pie, Cell } from 'recharts'
import { fmt } from '../utils/helpers'

const GRAYS = ['#FFFFFF', '#AAAAAA', '#666666', '#3A3A3A', '#242424']

export default function Dashboard({ income, expenses, balance, byCategory, monthTx, categories }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Balance hero */}
      <div style={{ background: '#111', border: '1px solid #2E2E2E', borderRadius: 18, padding: '20px 18px' }}>
        <div style={{ fontSize: 10, color: '#666', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Balance del mes</div>
        <div style={{ fontSize: 38, fontWeight: 800, color: '#fff', letterSpacing: -2, marginBottom: 16 }}>{fmt(balance)}</div>
        <div style={{ height: 1, background: '#2E2E2E', marginBottom: 16 }} />
        <div style={{ display: 'flex', gap: 28 }}>
          <div>
            <div style={{ fontSize: 9, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Ingresos</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#E8E8E8' }}>{fmt(income)}</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Gastos</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#888' }}>{fmt(expenses)}</div>
          </div>
        </div>
      </div>

      {/* Donut */}
      {byCategory.length > 0 && (
        <div style={{ background: '#111', border: '1px solid #2E2E2E', borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 10, color: '#666', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Gastos por categoría</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <PieChart width={100} height={100}>
              <Pie data={byCategory} dataKey="total" cx={46} cy={46} innerRadius={28} outerRadius={46} paddingAngle={2} startAngle={90} endAngle={-270}>
                {byCategory.map((_, i) => <Cell key={i} fill={GRAYS[i % GRAYS.length]} />)}
              </Pie>
            </PieChart>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {byCategory.slice(0, 5).map((cat, i) => (
                <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 3, height: 14, borderRadius: 99, background: GRAYS[i % GRAYS.length], flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#E8E8E8' }}>{cat.icon} {cat.name}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>{fmt(cat.total)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent */}
      {monthTx.length > 0 && (
        <div style={{ background: '#111', border: '1px solid #2E2E2E', borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 10, color: '#666', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Últimos movimientos</div>
          {[...monthTx].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map((tx, i, arr) => {
            const cat = categories.find(c => c.id === tx.categoryId)
            return (
              <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{cat?.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#E8E8E8' }}>{tx.note || cat?.name}</div>
                    <div style={{ fontSize: 11, color: '#666', marginTop: 1 }}>{cat?.name} · {tx.date}</div>
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: tx.type === 'income' ? '#E8E8E8' : '#888' }}>
                  {tx.type === 'income' ? '+' : '−'}{fmt(tx.amount)}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {monthTx.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💸</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#E8E8E8', marginBottom: 6 }}>Sin movimientos este mes</div>
          <div style={{ fontSize: 13 }}>Toca + para agregar tu primer movimiento</div>
        </div>
      )}
    </div>
  )
}
