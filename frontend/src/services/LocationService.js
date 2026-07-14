import api from './api.js'

function extractErrorMessage(error, fallback) {
  const data = error?.response?.data
  if (data?.errors) {
    const firstFieldError = Object.values(data.errors)[0]
    if (firstFieldError) return firstFieldError
  }
  if (data?.message) return data.message
  return fallback
}

/**
 * Fetches a page of locations from GET /api/admin/locations.
 * Returns the raw Spring Page<LocationResponse> shape:
 *   { content, totalElements, totalPages, number, size, ... }
 *
 * @param {object} params
 * @param {string} [params.search]   free-text search (name/address)
 * @param {string} [params.type]     one of LOCATION_TYPES values, omit for "all"
 * @param {number} params.page       0-indexed page number (Spring convention)
 * @param {number} params.size       page size
 */
export async function fetchLocations({ search, type, page, size }) {
  try {
    const { data } = await api.get('/admin/locations', {
      params: {
        search: search || undefined,
        type: type || undefined,
        page,
        size,
      },
    })
    return data
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to load locations.'))
  }
}

export async function createLocation(payload) {
  try {
    const { data } = await api.post('/admin/locations', payload)
    return data
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to create location.'))
  }
}

export async function updateLocation(id, payload) {
  try {
    const { data } = await api.put(`/admin/locations/${id}`, payload)
    return data
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to update location.'))
  }
}

export async function deleteLocation(id) {
  try {
    await api.delete(`/admin/locations/${id}`)
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to delete location.'))
  }
}