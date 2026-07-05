function ConfirmDialog({ title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card modal-card-narrow">
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" className="modal-close" onClick={onCancel} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-warning-text">{message}</p>
        </div>

        <div className="modal-footer">
          <button type="button" className="modal-secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="modal-danger-button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog