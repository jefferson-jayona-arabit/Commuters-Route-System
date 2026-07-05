import MapPlaceholder from '../components/user/MapPlaceholder.jsx'
import SearchPanel from '../components/user/SearchPanel.jsx'
import RouteSuggestionsList from '../components/user/RouteSuggestionsList.jsx'
import { SAMPLE_ROUTE_SUGGESTIONS } from '../components/user/routeSuggestionsSampleData.js'
import '../styles/user-dashboard.css'

function UserDashboardPage() {
  return (
    <div className="user-dashboard">
      <header className="user-topbar">
        <div className="user-topbar-brand">
          <span className="user-topbar-mark">CRS</span>
          <div>
            <p className="user-topbar-greeting">Hi, Commuter!</p>
            <p className="user-topbar-sub">Where are you headed today?</p>
          </div>
        </div>
      </header>

      <MapPlaceholder />

      <div className="search-card-wrap">
        <SearchPanel />
      </div>

      <RouteSuggestionsList suggestions={SAMPLE_ROUTE_SUGGESTIONS} />
    </div>
  )
}

export default UserDashboardPage