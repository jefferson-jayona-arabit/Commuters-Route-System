import LocationTypeBadge from './LocationTypeBadge.jsx'

function LocationTable({ locations, onView, onEdit, onDelete }) {
  return (
    <div className="location-table-wrap">
      <table className="location-table">
        <thead>
          <tr>
            <th>Location ID</th>
            <th>Location Name</th>
            <th>Type</th>
            <th>Address</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Created At</th>
            <th className="location-table-actions-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id}>
              <td data-label="Location ID">{loc.id}</td>
              <td data-label="Location Name" className="location-table-name">{loc.locationName}</td>
              <td data-label="Type"><LocationTypeBadge type={loc.locationType} /></td>
              <td data-label="Address">{loc.address}</td>
              <td data-label="Latitude">{loc.latitude}</td>
              <td data-label="Longitude">{loc.longitude}</td>
              <td data-label="Description" className="location-table-truncate">{loc.description || '—'}</td>
              <td data-label="Created By">{loc.createdBy || '—'}</td>
              <td data-label="Created At">{loc.createdAt || '—'}</td>
              <td data-label="Actions" className="location-table-actions">
                <button type="button" className="location-table-action" onClick={() => onView(loc)}>
                  View
                </button>
                <button type="button" className="location-table-action" onClick={() => onEdit(loc)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="location-table-action location-table-action-danger"
                  onClick={() => onDelete(loc)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LocationTable