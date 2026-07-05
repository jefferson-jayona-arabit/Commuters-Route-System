import { TerminalIcon, WaitingAreaIcon, StopIcon, LandmarkIcon } from './icons.jsx'

export const LOCATION_TYPES = [
  { value: 'terminal', label: 'Terminal', Icon: TerminalIcon, badgeClass: 'location-type-badge-terminal' },
  { value: 'waiting_area', label: 'Waiting Area', Icon: WaitingAreaIcon, badgeClass: 'location-type-badge-waiting' },
  { value: 'stop', label: 'Stop', Icon: StopIcon, badgeClass: 'location-type-badge-stop' },
  { value: 'landmark', label: 'Landmark', Icon: LandmarkIcon, badgeClass: 'location-type-badge-landmark' },
]

export function getLocationTypeMeta(value) {
  return LOCATION_TYPES.find((type) => type.value === value) || LOCATION_TYPES[2]
}

function LocationTypeBadge({ type }) {
  const meta = getLocationTypeMeta(type)
  const { Icon } = meta
  return (
    <span className={`location-type-badge ${meta.badgeClass}`}>
      <Icon />
      {meta.label}
    </span>
  )
}

export default LocationTypeBadge