import { useState } from 'react'
import { CloseIcon, UploadIcon } from './icons.jsx'
import { EMPTY_USER_FORM } from './mockUsers.js'

/**
 * mode: 'add' | 'edit'
 * initialValues: prefilled fields when editing an existing user
 * onSubmit(formValues) — wiring to the API happens in a later phase
 */
function UserFormModal({ mode = 'add', initialValues, onSubmit, onClose }) {
  const [values, setValues] = useState({ ...EMPTY_USER_FORM, ...initialValues })
  const [photoName, setPhotoName] = useState('')

  const isEdit = mode === 'edit'

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    setPhotoName(file ? file.name : '')
    handleChange('profile_photo', file ?? null)
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit?.(values)
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-form-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="user-form-title">{isEdit ? 'Edit User' : 'Add User'}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                type="text"
                required
                value={values.first_name}
                onChange={(event) => handleChange('first_name', event.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                type="text"
                required
                value={values.last_name}
                onChange={(event) => handleChange('last_name', event.target.value)}
              />
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={values.email}
                onChange={(event) => handleChange('email', event.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">{isEdit ? 'New Password' : 'Password'}</label>
              <input
                id="password"
                type="password"
                placeholder={isEdit ? 'Leave blank to keep current' : ''}
                required={!isEdit}
                value={values.password}
                onChange={(event) => handleChange('password', event.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                id="phone_number"
                type="tel"
                value={values.phone_number}
                onChange={(event) => handleChange('phone_number', event.target.value)}
              />
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                value={values.address}
                onChange={(event) => handleChange('address', event.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={values.role}
                onChange={(event) => handleChange('role', event.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={values.status}
                onChange={(event) => handleChange('status', event.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="profile_photo">Profile Photo (optional)</label>
              <label className="file-upload" htmlFor="profile_photo">
                <UploadIcon />
                <span>{photoName || 'Choose a file…'}</span>
              </label>
              <input
                id="profile_photo"
                type="file"
                accept="image/*"
                className="file-upload-input"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Save Changes' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserFormModal