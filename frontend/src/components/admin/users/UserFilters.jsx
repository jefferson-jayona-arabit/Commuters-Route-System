import { SearchIcon } from './icons.jsx'

function UserFilters({ search, onSearchChange, roleFilter, onRoleChange, statusFilter, onStatusChange }) {
  return (
    <div className="users-filters">
      <label className="users-search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="users-filter-group">
        <select
          value={roleFilter}
          onChange={(event) => onRoleChange(event.target.value)}
          aria-label="Filter by role"
        >
          <option value="all">All roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  )
}

export default UserFilters