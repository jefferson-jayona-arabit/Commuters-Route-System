function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-badge-${status}`}>
      <span className="status-dot" />
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  )
}

export default StatusBadge