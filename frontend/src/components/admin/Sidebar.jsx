function Sidebar({ items, activeKey, onSelect }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <span className="admin-sidebar-mark">CRS</span>
        <span className="admin-sidebar-name">Admin Panel</span>
      </div>

      <nav>
        <ul className="admin-nav">
          {items.map(({ key, label, Icon }) => (
            <li key={key}>
              <button
                type="button"
                className={`admin-nav-button${key === activeKey ? ' active' : ''}`}
                onClick={() => onSelect(key)}
                aria-current={key === activeKey ? 'page' : undefined}
              >
                <span className="admin-nav-icon">
                  <Icon />
                </span>
                <span className="admin-nav-label">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="admin-sidebar-footnote">
        Commuters Route System
      </div>
    </aside>
  )
}

export default Sidebar