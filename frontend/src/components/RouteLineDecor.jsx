const STOPS = [
  { label: 'Your location', hint: 'GPS or typed address' },
  { label: 'Molo terminal', hint: 'Board the jeepney here' },
  { label: 'Your destination', hint: 'Walking directions included' },
]

function RouteLineDecor() {
  return (
    <div className="route-line" aria-hidden="true">
      <div className="route-line-track">
        <span className="route-line-vehicle" />
      </div>
      <ul className="route-line-stops">
        {STOPS.map((stop) => (
          <li className="route-line-stop" key={stop.label}>
            <span className="route-line-dot" />
            <span className="route-line-text">
              <span className="route-line-label">{stop.label}</span>
              <span className="route-line-hint">{stop.hint}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RouteLineDecor
