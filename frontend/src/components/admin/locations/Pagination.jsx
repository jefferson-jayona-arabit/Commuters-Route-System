function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }) {
  if (totalItems === 0) return null

  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="pagination">
      <span className="pagination-summary">
        Showing {start}–{end} of {totalItems}
      </span>

      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="pagination-page">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination