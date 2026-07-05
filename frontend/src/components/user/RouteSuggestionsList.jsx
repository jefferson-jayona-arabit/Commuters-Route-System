import RouteSuggestionCard from './RouteSuggestionCard.jsx'

function RouteSuggestionsList({ suggestions }) {
  return (
    <div className="suggestions-section">
      <div className="suggestions-heading">
        <h2>Suggested routes</h2>
        <span className="suggestions-count">{suggestions.length} options found</span>
      </div>

      <div className="suggestions-list">
        {suggestions.map((suggestion) => (
          <RouteSuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </div>
  )
}

export default RouteSuggestionsList