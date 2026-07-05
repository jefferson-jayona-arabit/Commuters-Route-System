import { CloseIcon } from './icons.jsx'
import RoleBadge from './RoleBadge.jsx'
import StatusBadge from './StatusBadge.jsx'

function UserViewModal({ user, onClose }) {
  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-panel modal-panel-view"
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-view-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="user-view-title">User Details</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="user-view-avatar">
          {user.first_name[0]}
          {user.last_name[0]}
        </div>

        <dl className="user-view-grid">
          <div>
            <dt>User ID</dt>
            <dd>{user.user_id}</dd>
          </div>
          <div>
            <dt>Full Name</dt>
            <dd>{user.first_name} {user.last_name}</dd>
          </div>
          <div className="user-view-wide">
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Phone Number</dt>
            <dd>{user.phone_number || '—'}</dd>
          </div>
          <div>
            <dt>Created At</dt>
            <dd>{user.created_at}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd><RoleBadge role={user.role} /></dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd><StatusBadge status={user.status} /></dd>
          </div>
        </dl>

        <div className="modal-actions">
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserViewModal