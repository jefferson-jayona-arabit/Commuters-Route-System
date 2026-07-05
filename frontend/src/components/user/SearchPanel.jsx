import { useState } from 'react'

/**
 * UI only — no search logic wired up yet. Local state exists purely so the
 * inputs feel interactive; nothing is submitted anywhere yet.
 */
function SearchPanel() {
  const [currentLocation, setCurrentLocation] = useState('')
  const [destination, setDestination] = useState('')

  return (
    <div className="search-card">
      <div className="search-field">
        <label className="search-label" htmlFor="currentLocation">
          Current location
        </label>
        <div className="search-input-row">
          <input
            id="currentLocation"
            type="text"
            className="search-input"
            placeholder="Enter your current location"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
          />
          <button type="button" className="gps-button">
            Use GPS
          </button>
        </div>
      </div>

      <div className="search-field">
        <label className="search-label" htmlFor="destination">
          Destination
        </label>
        <input
          id="destination"
          type="text"
          className="search-input"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <button type="button" className="search-submit">
        Search Route
      </button>
    </div>
  )
}

export default SearchPanel