import { ViewIcon, EditIcon, DeleteIcon } from './icons.jsx'
import RoleBadge from './RoleBadge.jsx'
import StatusBadge from './StatusBadge.jsx'

function UserTable({ users, onView, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="users-empty">
        <p>No users match your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="users-table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created At</th>
            <th className="users-table-actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>#{user.user_id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td className="users-table-email">{user.email}</td>
              <td>{user.phone_number || '—'}</td>
              <td><RoleBadge role={user.role} /></td>
              <td><StatusBadge status={user.status} /></td>
              <td>{user.created_at}</td>
              <td>
                <div className="users-table-actions">
                  <button type="button" className="icon-btn" title="View" onClick={() => onView(user)}>
                    <ViewIcon />
                  </button>
                  <button type="button" className="icon-btn" title="Edit" onClick={() => onEdit(user)}>
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    className="icon-btn icon-btn-danger"
                    title="Delete"
                    onClick={() => onDelete(user)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable