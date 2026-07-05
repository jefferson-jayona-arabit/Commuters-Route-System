const VEHICLE_STYLES = {
  Jeepney: 'vehicle-badge-teal',
  Tricycle: 'vehicle-badge-amber',
  Bus: 'vehicle-badge-ink',
  'Motorcycle Taxi': 'vehicle-badge-outline',
}

function VehicleBadge({ type }) {
  const styleClass = VEHICLE_STYLES[type] || 'vehicle-badge-outline'
  return <span className={`vehicle-badge ${styleClass}`}>{type}</span>
}

export default VehicleBadge