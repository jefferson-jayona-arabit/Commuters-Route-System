import { useState } from 'react'
import '../../../styles/users.css'

function UserFormModal({ mode, initialValues, onSubmit, onClose, isSaving, errorMessage }) {
  const [formValues, setFormValues] = useState(
    initialValues || {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone_number: '',
      address: '',
      role: 'user',
      status: 'active',
    }
  )

  const [validationErrors, setValidationErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  function validateForm() {
    const errors = {}

    if (!formValues.first_name.trim()) errors.first_name = 'First name is required'
    if (!formValues.last_name.trim()) errors.last_name = 'Last name is required'
    if (!formValues.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = 'Invalid email format'
    }

    if (mode === 'add') {
      if (!formValues.password) {
        errors.password = 'Password is required'
      } else if (formValues.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
      }
    }

    if (formValues.phone_number && !/^[0-9\s\-\+\(\)]+$/.test(formValues.phone_number)) {
      errors.phone_number = 'Invalid phone number format'
    }

    return errors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    onSubmit(formValues)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === 'add' ? 'Add New User' : 'Edit User'}</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          {errorMessage && <div className="form-error">{errorMessage}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name *</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formValues.first_name}
                onChange={handleChange}
                disabled={isSaving}
                className={validationErrors.first_name ? 'input-error' : ''}
              />
              {validationErrors.first_name && (
                <span className="field-error">{validationErrors.first_name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formValues.last_name}
                onChange={handleChange}
                disabled={isSaving}
                className={validationErrors.last_name ? 'input-error' : ''}
              />
              {validationErrors.last_name && (
                <span className="field-error">{validationErrors.last_name}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              disabled={isSaving}
              className={validationErrors.email ? 'input-error' : ''}
            />
            {validationErrors.email && (
              <span className="field-error">{validationErrors.email}</span>
            )}
          </div>

          {mode === 'add' && (
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                disabled={isSaving}
                className={validationErrors.password ? 'input-error' : ''}
              />
              {validationErrors.password && (
                <span className="field-error">{validationErrors.password}</span>
              )}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formValues.phone_number}
                onChange={handleChange}
                disabled={isSaving}
                className={validationErrors.phone_number ? 'input-error' : ''}
              />
              {validationErrors.phone_number && (
                <span className="field-error">{validationErrors.phone_number}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formValues.role}
                onChange={handleChange}
                disabled={isSaving}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formValues.status}
                onChange={handleChange}
                disabled={isSaving}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : mode === 'add' ? 'Add User' : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserFormModal
