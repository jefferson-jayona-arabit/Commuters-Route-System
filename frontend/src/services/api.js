import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach the JWT from login (if present) to every outgoing request, so
// admin-only endpoints like /api/admin/locations can authenticate the caller.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('crs_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api