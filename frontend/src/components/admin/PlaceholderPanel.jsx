function PlaceholderPanel({ label }) {
  return (
    <div className="placeholder-panel">
      <h2>This is {label}</h2>
      <p>This section hasn&apos;t been built yet. It will manage the {label.toLowerCase()} table.</p>
    </div>
  )
}

export default PlaceholderPanel