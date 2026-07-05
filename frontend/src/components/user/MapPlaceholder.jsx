function MapPlaceholder() {
  return (
    <div className="map-card">
      <svg
        className="map-card-svg"
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect width="400" height="220" fill="var(--color-cream)" />

        {/* street grid */}
        <g stroke="var(--color-line)" strokeWidth="2">
          <line x1="0" y1="55" x2="400" y2="55" />
          <line x1="0" y1="120" x2="400" y2="120" />
          <line x1="0" y1="175" x2="400" y2="175" />
          <line x1="80" y1="0" x2="80" y2="220" />
          <line x1="180" y1="0" x2="180" y2="220" />
          <line x1="290" y1="0" x2="290" y2="220" />
        </g>

        {/* route line */}
        <path
          d="M 60 190 C 110 150, 130 120, 175 118 S 250 70, 330 45"
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1 11"
        />

        {/* current location pin */}
        <circle cx="60" cy="190" r="7" fill="var(--color-teal)" />
        <circle cx="60" cy="190" r="12" fill="var(--color-teal)" opacity="0.18" />

        {/* destination pin */}
        <path
          d="M330 45c0-8-6.5-14-14.5-14S301 37 301 45c0 11 14.5 24 14.5 24S330 56 330 45Z"
          fill="var(--color-amber)"
        />
        <circle cx="315.5" cy="44.5" r="4.5" fill="var(--color-cream)" />
      </svg>

      <span className="map-card-note">Map integration coming soon</span>
    </div>
  )
}

export default MapPlaceholder