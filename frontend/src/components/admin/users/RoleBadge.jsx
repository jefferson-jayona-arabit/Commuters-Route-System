function RoleBadge({ role }) {
  return <span className={`role-badge role-badge-${role}`}>{role === 'admin' ? 'Admin' : 'User'}</span>
}

export default RoleBadge