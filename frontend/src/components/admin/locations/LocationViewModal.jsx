import LocationTypeBadge from './LocationTypeBadge.jsx'

function Field({ label, value }) {
  return (
    <div className="location-view-field">
      <span className="location-view-label">{label}</span>
      <span className="location-view-value">{value || '—'}</span>
    </div>
  )
}

function LocationViewModal({ location, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Location details</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="location-view-header">
            <h4>{location.locationName}</h4>
            <LocationTypeBadge type={location.locationType} />
          </div>

          <Field label="Location ID" value={location.id} />
          <Field label="Address" value={location.address} />
          <div className="auth-form-row">
            <Field label="Latitude" value={location.latitude} />
            <Field label="Longitude" value={location.longitude} />
          </div>
          <Field label="Description" value={location.description} />
          <Field label="Created by" value={location.createdBy} />
          <Field label="Created at" value={location.createdAt} />
        </div>

        <div className="modal-footer">
          <button type="button" className="modal-secondary-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationViewModal