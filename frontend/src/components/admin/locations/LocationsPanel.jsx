import { useEffect, useState } from 'react'
import LocationFilters from './LocationFilters.jsx'
import LocationTable from './LocationTable.jsx'
import LocationFormModal from './LocationFormModal.jsx'
import LocationViewModal from './LocationViewModal.jsx'
import ConfirmDialog from './ConfirmDialog.jsx'
import Pagination from './Pagination.jsx'
import { PlusIcon } from './icons.jsx'
import { SAMPLE_LOCATIONS } from './sampleLocations.js'
import '../../../styles/locations.css'

const PAGE_SIZE = 5

/**
 * Design-stage implementation. `locations` starts seeded with sample
 * placeholder rows (see sampleLocations.js) purely to demonstrate the
 * table/filter/pagination layout — this is NOT real data from the
 * database. Add/Edit/Delete only update local component state for now.
 * Swap in GET/POST/PUT/DELETE `/api/admin/locations` in a later phase.
 */
function LocationsPanel() {
  const [locations, setLocations] = useState(SAMPLE_LOCATIONS)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const [formMode, setFormMode] = useState(null) // 'create' | 'edit' | null
  const [editingLocation, setEditingLocation] = useState(null)
  const [viewingLocation, setViewingLocation] = useState(null)
  const [deletingLocation, setDeletingLocation] = useState(null)

  const filtered = locations.filter((loc) => {
    const matchesType = typeFilter === 'all' || loc.locationType === typeFilter
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch =
      term === '' ||
      loc.locationName.toLowerCase().includes(term) ||
      loc.address.toLowerCase().includes(term)
    return matchesType && matchesSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, typeFilter])

  function getCurrentAdminName() {
    try {
      const stored = JSON.parse(localStorage.getItem('crs_user'))
      if (stored?.firstName) return `${stored.firstName} ${stored.lastName || ''}`.trim()
    } catch {
      // ignore malformed/missing localStorage value
    }
    return 'Admin'
  }

  function openAddForm() {
    setEditingLocation(null)
    setFormMode('create')
  }

  function openEditForm(location) {
    setEditingLocation(location)
    setFormMode('edit')
  }

  function closeForm() {
    setFormMode(null)
    setEditingLocation(null)
  }

  function handleFormSubmit(formData) {
    if (formMode === 'edit' && editingLocation) {
      setLocations((prev) =>
        prev.map((loc) => (loc.id === editingLocation.id ? { ...loc, ...formData } : loc))
      )
    } else {
      const newLocation = {
        id: locations.length ? Math.max(...locations.map((l) => l.id)) + 1 : 1,
        ...formData,
        createdBy: getCurrentAdminName(),
        createdAt: new Date().toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' }),
      }
      setLocations((prev) => [newLocation, ...prev])
    }
    closeForm()
  }

  function handleConfirmDelete() {
    setLocations((prev) => prev.filter((loc) => loc.id !== deletingLocation.id))
    setDeletingLocation(null)
  }

  return (
    <div className="locations-management">
      <div className="locations-toolbar">
        <LocationFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />
        <button type="button" className="locations-add-button" onClick={openAddForm}>
          <PlusIcon /> Add Location
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="locations-empty-state">
          <p>No locations match your search or filter.</p>
        </div>
      ) : (
        <>
          <LocationTable
            locations={paginated}
            onView={setViewingLocation}
            onEdit={openEditForm}
            onDelete={setDeletingLocation}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {formMode && (
        <LocationFormModal
          mode={formMode}
          initialData={editingLocation}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
        />
      )}

      {viewingLocation && (
        <LocationViewModal location={viewingLocation} onClose={() => setViewingLocation(null)} />
      )}

      {deletingLocation && (
        <ConfirmDialog
          title="Delete location"
          message={`Are you sure you want to delete "${deletingLocation.locationName}"? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingLocation(null)}
        />
      )}
    </div>
  )
}

export default LocationsPanel