export async function askClaude(messages, context) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: `Eres Finn, un asistente financiero personal directo y útil.
Tienes acceso a los datos financieros reales del usuario:

${context}

Responde en español colombiano coloquial, conciso y práctico.
Da consejos concretos basados en los datos reales. Sin rodeos.`,
      messages,
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.content?.map(b => b.text || '').join('') || 'Sin respuesta.'
}
