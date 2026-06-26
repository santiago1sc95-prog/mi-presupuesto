import { useState, useEffect } from 'react'
import { fmt, todayStr, monthOf, uid, load, save, DEFAULT_CATS } from './utils/helpers'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import Goals from './components/Goals'
import AIChat from './components/AIChat'
import { AddTxModal, AddGoalModal, ContributeModal } from './components/Modals'

const currentMonth = () => todayStr().slice(0, 7)

const NAV = [
  { id: 'dashboard',    icon: '◈', label: 'Inicio' },
  { id: 'transactions', icon: '↕', label: 'Movimientos' },
  { id: 'goals',        icon: '◎', label: 'Metas' },
  { id: 'ai',           icon: '✦', label: 'Finn IA' },
]

export default function App() {
  const [tab, setTab]               = useState('dashboard')
  const [transactions, setTx]       = useState(() => load('finn_tx', []))
  const [categories]                = useState(DEFAULT_CATS)
  const [goals, setGoals]           = useState(() => load('finn_goals', []))
  const [modal, setModal]           = useState(null)
  const [month, setMonth]           = useState(currentMonth)
  const [toast, setToast]           = useState(null)

  useEffect(() => { save('finn_tx', transactions) }, [transactions])
  useEffect(() => { save('finn_goals', goals) }, [goals])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  // Computed
  const monthTx   = transactions.filter(t => monthOf(t.date) === month)
  const income    = monthTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses  = monthTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance   = income - expenses

  const byCategory = categories
    .filter(c => c.id !== 'income')
    .map(cat => ({
      ...cat,
      total: monthTx.filter(t => t.type === 'expense' && t.categoryId === cat.id).reduce((s, t) => s + t.amount, 0),
    }))
    .filter(c => c.total > 0)
    .sort((a, b) => b.total - a.total)

  const months = [...new Set(transactions.map(t => monthOf(t.date)))].sort().reverse()
  if (!months.includes(month)) months.unshift(month)

  const financialContext = `
MES: ${month}
Ingresos: ${fmt(income)} | Gastos: ${fmt(expenses)} | Balance: ${fmt(balance)}

GASTOS POR CATEGORÍA:
${byCategory.map(c => `  ${c.icon} ${c.name}: ${fmt(c.total)}`).join('\n') || '  Sin gastos'}

METAS DE AHORRO:
${goals.map(g => `  ${g.emoji} ${g.name}: ${fmt(g.saved)}/${fmt(g.target)} (${Math.round((g.saved / g.target) * 100)}%)`).join('\n') || '  Sin metas'}

ÚLTIMAS TRANSACCIONES:
${[...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8).map(t => {
  const cat = categories.find(c => c.id === t.categoryId)
  return `  ${t.type === 'income' ? '+' : '-'}${fmt(t.amount)} ${cat?.name} "${t.note || ''}" ${t.date}`
}).join('\n')}
  `

  const addTx = (tx) => {
    setTx(p => [{ ...tx, id: uid() }, ...p])
    setModal(null)
    showToast('Transacción guardada ✓')
  }

  const addGoal = (g) => {
    setGoals(p => [...p, { ...g, id: uid(), saved: 0 }])
    setModal(null)
    showToast('Meta creada ✓')
  }

  const contribute = (amount) => {
    setGoals(p => p.map(g => g.id === modal.goal.id ? { ...g, saved: Math.min(g.saved + amount, g.target) } : g))
    setModal(null)
    showToast('Aporte registrado ✓')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', maxWidth: 480, margin: '0 auto', position: 'relative' }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#0A0A0A', padding: '9px 22px', borderRadius: 99, fontSize: 13, fontWeight: 700, zIndex: 999, pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ padding: '22px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, color: '#666', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Tu presupuesto</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
            Finn <span style={{ color: '#666', fontWeight: 300 }}>✦</span>
          </div>
        </div>
        <select
          value={month}
          onChange={e => setMonth(e.target.value)}
          style={{ background: '#111', color: '#E8E8E8', border: '1px solid #2E2E2E', borderRadius: 9, padding: '7px 11px', fontSize: 13, cursor: 'pointer', outline: 'none' }}
        >
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 110px' }}>
        {tab === 'dashboard'    && <Dashboard income={income} expenses={expenses} balance={balance} byCategory={byCategory} monthTx={monthTx} categories={categories} />}
        {tab === 'transactions' && <Transactions monthTx={monthTx} transactions={transactions} setTransactions={setTx} categories={categories} showToast={showToast} onAdd={() => setModal('tx')} />}
        {tab === 'goals'        && <Goals goals={goals} setGoals={setGoals} showToast={showToast} onAdd={() => setModal('goal')} onContribute={g => setModal({ type: 'contribute', goal: g })} />}
        {tab === 'ai'           && <AIChat financialContext={financialContext} />}
      </div>

      {/* FAB */}
      {(tab === 'dashboard' || tab === 'transactions') && (
        <button
          onClick={() => setModal('tx')}
          style={{ position: 'fixed', bottom: 84, right: 'max(calc(50% - 220px), 20px)', width: 50, height: 50, borderRadius: '50%', background: '#fff', color: '#0A0A0A', border: 'none', fontSize: 28, fontWeight: 300, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          +
        </button>
      )}

      {/* Bottom nav */}
      <nav style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, background: '#111', borderTop: '1px solid #2E2E2E', display: 'flex', padding: '8px 0 16px', zIndex: 100 }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)}
            style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 18, color: tab === n.id ? '#fff' : '#444' }}>{n.icon}</span>
            <span style={{ fontSize: 10, color: tab === n.id ? '#fff' : '#444', fontWeight: tab === n.id ? 700 : 400 }}>{n.label}</span>
          </button>
        ))}
      </nav>

      {/* Modals */}
      {modal === 'tx'               && <AddTxModal categories={categories} onClose={() => setModal(null)} onSave={addTx} />}
      {modal === 'goal'             && <AddGoalModal onClose={() => setModal(null)} onSave={addGoal} />}
      {modal?.type === 'contribute' && <ContributeModal goal={modal.goal} onClose={() => setModal(null)} onSave={contribute} />}
    </div>
  )
}
