import { useEffect, useState } from 'react'
import { LOCATION_TYPES } from './LocationTypeBadge.jsx'
import LocationPickerModal from './LocationPickerModal.jsx'
import { StopIcon } from './icons.jsx'

const EMPTY_FORM = {
  locationName: '',
  locationType: 'stop',
  address: '',
  latitude: '',
  longitude: '',
  description: '',
}

function LocationFormModal({ mode, initialData, onSubmit, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({ ...EMPTY_FORM, ...initialData })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [mode, initialData])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.locationName.trim()) nextErrors.locationName = 'Location name is required'
    if (!form.address.trim()) nextErrors.address = 'Address is required'

    const lat = parseFloat(form.latitude)
    if (form.latitude === '' || Number.isNaN(lat)) {
      nextErrors.latitude = 'Latitude is required'
    } else if (lat < -90 || lat > 90) {
      nextErrors.latitude = 'Must be between -90 and 90'
    }

    const lng = parseFloat(form.longitude)
    if (form.longitude === '' || Number.isNaN(lng)) {
      nextErrors.longitude = 'Longitude is required'
    } else if (lng < -180 || lng > 180) {
      nextErrors.longitude = 'Must be between -180 and 180'
    }

    return nextErrors
  }

  function handlePickLocation(lat, lng) {
    setForm((prev) => ({ ...prev, latitude: lat.toFixed(6), longitude: lng.toFixed(6) }))
    setErrors((prev) => ({ ...prev, latitude: undefined, longitude: undefined }))
    setIsPickerOpen(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return
    onSubmit(form)
  }

  return (
    <>
      <div className="modal-backdrop" role="dialog" aria-modal="true">
        <div className="modal-card">
        <div className="modal-header">
          <h3>{mode === 'edit' ? 'Edit location' : 'Add location'}</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="field">
              <label className="field-label" htmlFor="locationName">Location name</label>
              <input
                id="locationName"
                name="locationName"
                className={`field-input${errors.locationName ? ' field-input-error' : ''}`}
                value={form.locationName}
                onChange={handleChange}
                placeholder="Molo Plaza Terminal"
              />
              {errors.locationName && <span className="field-error">{errors.locationName}</span>}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="locationType">Location type</label>
              <select
                id="locationType"
                name="locationType"
                className="field-input"
                value={form.locationType}
                onChange={handleChange}
              >
                {LOCATION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                className={`field-input${errors.address ? ' field-input-error' : ''}`}
                value={form.address}
                onChange={handleChange}
                placeholder="Molo District, Iloilo City"
              />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </div>

            <button
              type="button"
              className="location-picker-trigger"
              onClick={() => setIsPickerOpen(true)}
            >
              <StopIcon /> Select Location
            </button>

            <div className="auth-form-row">
              <div className="field">
                <label className="field-label" htmlFor="latitude">Latitude</label>
                <input
                  id="latitude"
                  name="latitude"
                  className={`field-input${errors.latitude ? ' field-input-error' : ''}`}
                  value={form.latitude}
                  onChange={handleChange}
                  placeholder="10.6975"
                  inputMode="decimal"
                />
                {errors.latitude && <span className="field-error">{errors.latitude}</span>}
              </div>
              <div className="field">
                <label className="field-label" htmlFor="longitude">Longitude</label>
                <input
                  id="longitude"
                  name="longitude"
                  className={`field-input${errors.longitude ? ' field-input-error' : ''}`}
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder="122.5406"
                  inputMode="decimal"
                />
                {errors.longitude && <span className="field-error">{errors.longitude}</span>}
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="field-input location-textarea"
                value={form.description}
                onChange={handleChange}
                placeholder="Optional notes about this location"
                rows={3}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="modal-secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-primary-button">
              {mode === 'edit' ? 'Save changes' : 'Add location'}
            </button>
          </div>
        </form>
        </div>
      </div>

      {isPickerOpen && (
        <LocationPickerModal
          initialLat={form.latitude}
          initialLng={form.longitude}
          onConfirm={handlePickLocation}
          onCancel={() => setIsPickerOpen(false)}
        />
      )}
    </>
  )
}

export default LocationFormModal