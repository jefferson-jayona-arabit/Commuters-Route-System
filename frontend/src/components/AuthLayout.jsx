import RouteLineDecor from './RouteLineDecor.jsx'

function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <div className="auth-shell">
      <aside className="auth-panel">
        <div className="auth-panel-brand">
          <span className="auth-panel-mark">CRS</span>
          <span className="auth-panel-name">Commuters Route System</span>
        </div>

        <div className="auth-panel-copy">
          <p className="auth-panel-eyebrow">Para sa mga sakay araw-araw</p>
          <h1 className="auth-panel-headline">
            Alamin ang pinakamabilis na biyahe papunta sa'yong destinasyon.
          </h1>
        </div>

        <RouteLineDecor />

        <p className="auth-panel-footnote">
          Jeep &middot; Tricycle &middot; Bus &middot; Motor
        </p>
      </aside>

      <main className="auth-content">
        <div className="auth-card">
          <p className="auth-eyebrow">{eyebrow}</p>
          <h2 className="auth-title">{title}</h2>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          {children}
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
