import api from './api.js'

/**
 * Extracts a user-friendly message from an axios error, falling back
 * to a generic message when the backend doesn't return one.
 */
function extractErrorMessage(error, fallback) {
  const data = error?.response?.data
  if (data?.errors) {
    const firstFieldError = Object.values(data.errors)[0]
    if (firstFieldError) return firstFieldError
  }
  if (data?.message) return data.message
  return fallback
}

export async function registerUser(payload) {
  try {
    const { data } = await api.post('/auth/register', payload)
    return data
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Registration failed. Please try again.'))
  }
}

export async function loginUser(payload) {
  try {
    const { data } = await api.post('/auth/login', payload)
    return data
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Login failed. Please check your credentials.'))
  }
}
