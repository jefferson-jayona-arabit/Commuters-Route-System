import { useCallback, useEffect, useState } from 'react'
import LocationFilters from './LocationFilters.jsx'
import LocationTable from './LocationTable.jsx'
import LocationFormModal from './LocationFormModal.jsx'
import LocationViewModal from './LocationViewModal.jsx'
import ConfirmDialog from './ConfirmDialog.jsx'
import Pagination from './Pagination.jsx'
import { PlusIcon } from './icons.jsx'
import { fetchLocations, createLocation, updateLocation, deleteLocation } from '../../../services/LocationService.js'
import '../../../styles/locations.css'

const PAGE_SIZE = 5
const SEARCH_DEBOUNCE_MS = 400

function LocationsPanel() {
  const [locations, setLocations] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState('')

  const [formMode, setFormMode] = useState(null) // 'create' | 'edit' | null
  const [editingLocation, setEditingLocation] = useState(null)
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [viewingLocation, setViewingLocation] = useState(null)
  const [deletingLocation, setDeletingLocation] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Debounce the search box so we don't fire a request on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Reset to page 1 whenever the search term or type filter actually changes.
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, typeFilter])

  const loadLocations = useCallback(async () => {
    setIsLoading(true)
    setLoadError('')
    try {
      const data = await fetchLocations({
        search: debouncedSearch,
        type: typeFilter === 'all' ? undefined : typeFilter,
        page: currentPage - 1, // Spring's Pageable is 0-indexed
        size: PAGE_SIZE,
      })
      setLocations(data.content)
      setTotalPages(Math.max(1, data.totalPages))
      setTotalItems(data.totalElements)
    } catch (error) {
      setLoadError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearch, typeFilter, currentPage])

  useEffect(() => {
    loadLocations()
  }, [loadLocations])

  function openAddForm() {
    setEditingLocation(null)
    setFormError('')
    setFormMode('create')
  }

  function openEditForm(location) {
    setEditingLocation(location)
    setFormError('')
    setFormMode('edit')
  }

  function closeForm() {
    setFormMode(null)
    setEditingLocation(null)
    setFormError('')
  }

  async function handleFormSubmit(formData) {
    setFormError('')
    setIsSubmitting(true)

    const payload = {
      locationName: formData.locationName,
      locationType: formData.locationType,
      address: formData.address,
      description: formData.description,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
    }

    try {
      if (formMode === 'edit' && editingLocation) {
        await updateLocation(editingLocation.id, payload)
      } else {
        await createLocation(payload)
      }
      closeForm()
      loadLocations()
    } catch (error) {
      setFormError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleConfirmDelete() {
    setDeleteError('')
    setIsDeleting(true)
    try {
      await deleteLocation(deletingLocation.id)
      setDeletingLocation(null)
      // If we just deleted the last row on a page beyond page 1, step back a page.
      if (locations.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1)
      } else {
        loadLocations()
      }
    } catch (error) {
      setDeleteError(error.message)
    } finally {
      setIsDeleting(false)
    }
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

      {isLoading && (
        <div className="locations-empty-state">
          <p>Loading locations…</p>
        </div>
      )}

      {!isLoading && loadError && (
        <div className="locations-empty-state">
          <p>{loadError}</p>
        </div>
      )}

      {!isLoading && !loadError && locations.length === 0 && (
        <div className="locations-empty-state">
          <p>No locations match your search or filter.</p>
        </div>
      )}

      {!isLoading && !loadError && locations.length > 0 && (
        <>
          <LocationTable
            locations={locations}
            onView={setViewingLocation}
            onEdit={openEditForm}
            onDelete={setDeletingLocation}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {formMode && (
        <LocationFormModal
          mode={formMode}
          initialData={editingLocation}
          serverError={formError}
          isSubmitting={isSubmitting}
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
          error={deleteError}
          isConfirming={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setDeletingLocation(null)
            setDeleteError('')
          }}
        />
      )}
    </div>
  )
}

export default LocationsPanel