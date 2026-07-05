import VehicleBadge from './VehicleBadge.jsx'

function RouteSuggestionCard({ suggestion }) {
  const {
    tag,
    vehicleType,
    routeName,
    pickupPoint,
    dropoffPoint,
    walkToPickupMin,
    walkFromDropoffMin,
    fare,
    durationMin,
    distanceKm,
  } = suggestion

  return (
    <div className="suggestion-card">
      <div className="suggestion-card-header">
        <VehicleBadge type={vehicleType} />
        {tag && <span className="suggestion-tag">{tag}</span>}
      </div>

      <h3 className="suggestion-route-name">{routeName}</h3>

      <div className="suggestion-stops">
        <div className="suggestion-stop">
          <span className="suggestion-stop-dot suggestion-stop-dot-start" />
          <div>
            <p className="suggestion-stop-label">Board at</p>
            <p className="suggestion-stop-value">{pickupPoint}</p>
            {walkToPickupMin > 0 && (
              <p className="suggestion-walk-hint">{walkToPickupMin} min walk from you</p>
            )}
          </div>
        </div>
        <div className="suggestion-stop">
          <span className="suggestion-stop-dot suggestion-stop-dot-end" />
          <div>
            <p className="suggestion-stop-label">Get off at</p>
            <p className="suggestion-stop-value">{dropoffPoint}</p>
            {walkFromDropoffMin > 0 && (
              <p className="suggestion-walk-hint">{walkFromDropoffMin} min walk to destination</p>
            )}
          </div>
        </div>
      </div>

      <div className="suggestion-meta">
        <span><strong>{fare}</strong> fare</span>
        <span>{durationMin} min</span>
        <span>{distanceKm} km</span>
      </div>

      <button type="button" className="suggestion-view-button">
        View on map
      </button>
    </div>
  )
}

export default RouteSuggestionCard