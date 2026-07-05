const STATS = [
  { label: 'Total Users', value: '—', hint: 'Registered commuters + admins' },
  { label: 'Active Routes', value: '—', hint: 'Across all vehicle types' },
  { label: 'Vehicle Types', value: '—', hint: 'Jeep, tricycle, bus, and more' },
  { label: 'Locations Logged', value: '—', hint: 'Terminals, stops, waiting areas' },
]

function DashboardOverview() {
  return (
    <div className="dashboard-overview">
      <div className="stat-grid">
        {STATS.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-card-label">{stat.label}</span>
            <span className="stat-card-value">{stat.value}</span>
            <span className="stat-card-hint">{stat.hint}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-note">
        <p>
          These figures will populate once the corresponding management
          endpoints are connected. Use the sidebar to manage each part of
          the system.
        </p>
      </div>
    </div>
  )
}

export default DashboardOverview