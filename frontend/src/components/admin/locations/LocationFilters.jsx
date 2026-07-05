import { SearchIcon } from './icons.jsx'
import { LOCATION_TYPES } from './LocationTypeBadge.jsx'

function LocationFilters({ searchTerm, onSearchChange, typeFilter, onTypeFilterChange }) {
  return (
    <div className="location-filters">
      <div className="location-search">
        <span className="location-search-icon"><SearchIcon /></span>
        <input
          type="text"
          className="location-search-input"
          placeholder="Search by name or address…"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        className="location-type-select"
        value={typeFilter}
        onChange={(e) => onTypeFilterChange(e.target.value)}
      >
        <option value="all">All types</option>
        {LOCATION_TYPES.map((type) => (
          <option key={type.value} value={type.value}>{type.label}</option>
        ))}
      </select>
    </div>
  )
}

export default LocationFilters