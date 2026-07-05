import api from './api.js'

function extractErrorMessage(error, fallback) {
  return error?.response?.data?.message || fallback
}

/**
 * Maps the backend's camelCase UserResponse into the snake_case shape
 * already used by UsersPanel.jsx / UserTable.jsx / UserFormModal.jsx.
 */
function toUserRow(data) {
  return {
    user_id: data.userId,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone_number: data.phoneNumber,
    address: data.address,
    role: data.role,
    status: data.status,
    profile_photo: data.profilePhoto,
    created_at: data.createdAt ? data.createdAt.slice(0, 10) : null,
  }
}

function toCreatePayload(formValues) {
  return {
    firstName: formValues.first_name,
    lastName: formValues.last_name,
    email: formValues.email,
    password: formValues.password,
    phoneNumber: formValues.phone_number,
    address: formValues.address,
    role: formValues.role,
    status: formValues.status,
    // File upload/storage isn't wired up yet — only a filename/URL would go here.
    profilePhoto: null,
  }
}

function toUpdatePayload(formValues) {
  return {
    firstName: formValues.first_name,
    lastName: formValues.last_name,
    email: formValues.email,
    password: formValues.password || '',
    phoneNumber: formValues.phone_number,
    address: formValues.address,
    role: formValues.role,
    status: formValues.status,
    profilePhoto: null,
  }
}

/**
 * GET /api/users — supports the Users panel's search bar, Role/Status
 * filters, and pagination.
 */
export async function fetchUsers({ search = '', role = 'all', status = 'all', page = 1, size = 5 } = {}) {
  try {
    const { data } = await api.get('/users', {
      params: {
        search: search || undefined,
        role: role === 'all' ? undefined : role,
        status: status === 'all' ? undefined : status,
        page,
        size,
      },
    })
    return {
      items: data.items.map(toUserRow),
      page: data.page,
      pageSize: data.pageSize,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
    }
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to load users. Please try again.'))
  }
}

export async function createUser(formValues) {
  try {
    const { data } = await api.post('/users', toCreatePayload(formValues))
    return toUserRow(data)
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to add user. Please try again.'))
  }
}

export async function updateUser(userId, formValues) {
  try {
    const { data } = await api.put(`/users/${userId}`, toUpdatePayload(formValues))
    return toUserRow(data)
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to update user. Please try again.'))
  }
}

export async function deleteUser(userId) {
  try {
    const { data } = await api.delete(`/users/${userId}`)
    return data
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to delete user. Please try again.'))
  }
}