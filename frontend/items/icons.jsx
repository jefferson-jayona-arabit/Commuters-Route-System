const common = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function DashboardIcon() {
  return (
    <svg {...common}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  )
}

export function UsersIcon() {
  return (
    <svg {...common}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <circle cx="17" cy="8.5" r="2.4" />
      <path d="M15.5 14.8c2.5.3 4.5 2.3 4.5 5.2" />
    </svg>
  )
}

export function VehicleIcon() {
  return (
    <svg {...common}>
      <path d="M3 15V9a1 1 0 0 1 1-1h9l4 4h2a1 1 0 0 1 1 1v2" />
      <path d="M3 15h17" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  )
}

export function LocationIcon() {
  return (
    <svg {...common}>
      <path d="M12 21s-6.5-5.9-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.1-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  )
}

export function RouteIcon() {
  return (
    <svg {...common}>
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="18.5" cy="5.5" r="2" />
      <path d="M7.2 17.3C12 12.5 12 12.5 16.8 7.2" strokeDasharray="2.6 3" />
    </svg>
  )
}

export function StopsIcon() {
  return (
    <svg {...common}>
      <path d="M4 20V6a2 2 0 0 1 2-2h9l5 5v11" />
      <path d="M4 12h16" />
      <path d="M9 4v16" />
    </svg>
  )
}

export function PathIcon() {
  return (
    <svg {...common}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7 6h10" />
      <path d="M12 16 17.5 7.5" />
      <path d="M12 16 6.5 7.5" />
    </svg>
  )
}

export function FaresIcon() {
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.2c0-1.2 1.1-2.1 2.5-2.1s2.5.8 2.5 1.9c0 2.6-5 1.7-5 4.2 0 1.1 1.1 1.9 2.5 1.9s2.5-.9 2.5-2.1" />
      <path d="M12 5.8v1.4M12 16.8v1.4" />
    </svg>
  )
}

export function HistoryIcon() {
  return (
    <svg {...common}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v4h4" />
      <path d="M12 8v4.5l3 1.8" />
    </svg>
  )
}

export function SettingsIcon() {
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.9-1.4-2-3.4-2.2.7a7.6 7.6 0 0 0-2.6-1.5L14 2.5h-4l-.5 2.4a7.6 7.6 0 0 0-2.6 1.5l-2.2-.7-2 3.4L4.6 10.5a7.6 7.6 0 0 0 0 3L2.7 15l2 3.4 2.2-.7a7.6 7.6 0 0 0 2.6 1.5l.5 2.4h4l.5-2.4a7.6 7.6 0 0 0 2.6-1.5l2.2.7 2-3.4-1.9-1.4Z" />
    </svg>
  )
}