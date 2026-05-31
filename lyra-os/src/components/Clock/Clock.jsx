export function Clock() {
  const now = new Date()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <div className="card">
      <p>{date}</p>
      <div className="big-number">{time}</div>
    </div>
  )
}
