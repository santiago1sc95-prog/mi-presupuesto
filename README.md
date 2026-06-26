# Finn — Tu presupuesto personal

App de presupuesto financiero con IA integrada (Claude). Diseño minimalista blanco y negro.

## Setup en 5 minutos

### 1. Instalar dependencias
```bash
npm install
```

### 2. API Key de Anthropic (para Finn IA)
Crea el archivo `.env` en la raíz del proyecto:
```
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
```
Consigue tu key en: https://console.anthropic.com

Luego en `src/utils/ai.js` agrega el header de la API key:
```js
headers: {
  'Content-Type': 'application/json',
  'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
  'anthropic-version': '2023-06-01',
},
```

### 3. Correr en local
```bash
npm run dev
```
Abre http://localhost:5173

### 4. Deploy en Vercel
1. Sube el proyecto a GitHub
2. Ve a https://vercel.com → "New Project" → importa tu repo
3. En "Environment Variables" agrega: `VITE_ANTHROPIC_API_KEY = sk-ant-...`
4. Click "Deploy" → listo en 2 minutos

## Estructura
```
src/
  App.jsx              → componente raíz + estado global
  components/
    Dashboard.jsx      → pantalla principal
    Transactions.jsx   → lista de movimientos
    Goals.jsx          → metas de ahorro
    AIChat.jsx         → chat con Finn IA
    Modal.jsx          → modal base + estilos compartidos
    Modals.jsx         → AddTx, AddGoal, Contribute
  utils/
    helpers.js         → fmt, uid, load/save, categorías por defecto
    ai.js              → llamada a Claude API
  index.css            → variables CSS + reset
```

## Features
- ✅ Dashboard con balance, donut de gastos y movimientos recientes
- ✅ Registrar ingresos y gastos con categorías
- ✅ Metas de ahorro con barra de progreso
- ✅ Finn IA — chat que analiza tus finanzas reales
- ✅ Datos persistentes en localStorage
- ✅ Diseño mobile-first, oscuro, minimalista
