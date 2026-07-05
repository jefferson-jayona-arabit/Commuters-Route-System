const common = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function TerminalIcon() {
  return (
    <svg {...common}>
      <path d="M4 20V10l8-5 8 5v10" />
      <path d="M4 20h16" />
      <path d="M9 20v-6h6v6" />
    </svg>
  )
}

export function WaitingAreaIcon() {
  return (
    <svg {...common}>
      <path d="M4 20v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
      <path d="M4 20h16" />
      <path d="M6 12V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
    </svg>
  )
}

export function StopIcon() {
  return (
    <svg {...common}>
      <path d="M12 21s-6.5-5.9-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.1-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  )
}

export function LandmarkIcon() {
  return (
    <svg {...common}>
      <path d="M5 21V6l1-3 1 3v15" />
      <path d="M6 6h13l-3 3.5L19 13H6" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg {...common} width="15" height="15">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.3-4.3" />
    </svg>
  )
}

export function PlusIcon() {
  return (
    <svg {...common} width="14" height="14">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}