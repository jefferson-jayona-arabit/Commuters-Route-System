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

export function SearchIcon() {
  return (
    <svg {...common}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </svg>
  )
}

export function PlusIcon() {
  return (
    <svg {...common}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg {...common}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function ViewIcon() {
  return (
    <svg {...common}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  )
}

export function EditIcon() {
  return (
    <svg {...common}>
      <path d="M4 20l.9-4.2L15.6 5.1a1.5 1.5 0 0 1 2.1 0l1.2 1.2a1.5 1.5 0 0 1 0 2.1L8.2 19.1 4 20Z" />
      <path d="M14 7.2l2.8 2.8" />
    </svg>
  )
}

export function DeleteIcon() {
  return (
    <svg {...common}>
      <path d="M5 7h14" />
      <path d="M9 7V5.2c0-.7.5-1.2 1.2-1.2h3.6c.7 0 1.2.5 1.2 1.2V7" />
      <path d="M7 7l1 12.2c0 .7.5 1.3 1.2 1.3h5.6c.7 0 1.2-.6 1.2-1.3L17 7" />
      <path d="M10.2 11v5.2M13.8 11v5.2" />
    </svg>
  )
}

export function ChevronLeftIcon() {
  return (
    <svg {...common}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  )
}

export function ChevronRightIcon() {
  return (
    <svg {...common}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function UploadIcon() {
  return (
    <svg {...common}>
      <path d="M12 15V4" />
      <path d="M8 8l4-4 4 4" />
      <path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" />
    </svg>
  )
}