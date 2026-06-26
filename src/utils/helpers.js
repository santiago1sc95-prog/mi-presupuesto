export const fmt = (n) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(n)

export const todayStr = () => new Date().toISOString().split('T')[0]

export const monthOf = (d) => d.slice(0, 7)

export const uid = () => Math.random().toString(36).slice(2, 9)

export const load = (key, def) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : def
  } catch {
    return def
  }
}

export const save = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

export const DEFAULT_CATS = [
  { id: 'c1', name: 'Alimentación', icon: '🍔' },
  { id: 'c2', name: 'Transporte',   icon: '🚌' },
  { id: 'c3', name: 'Vivienda',     icon: '🏠' },
  { id: 'c4', name: 'Entretenimiento', icon: '🎮' },
  { id: 'c5', name: 'Salud',        icon: '💊' },
  { id: 'c6', name: 'Educación',    icon: '📚' },
  { id: 'c7', name: 'Ropa',         icon: '👕' },
  { id: 'c8', name: 'Otros',        icon: '📦' },
  { id: 'income', name: 'Ingreso',  icon: '💰' },
]
