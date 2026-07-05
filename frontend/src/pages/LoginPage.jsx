import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import InputField from '../components/InputField.jsx'
import { loginUser } from '../services/authService.js'
import { validateLoginForm } from '../utils/validators.js'

const INITIAL_FORM = { email: '', password: '' }

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setServerError('')

    const validationErrors = validateLoginForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const data = await loginUser(form)
      // Store the session; swap for httpOnly cookies if your backend supports it.
      localStorage.setItem('crs_token', data.token)
      localStorage.setItem('crs_user', JSON.stringify({
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      }))

      if (data.role === 'ADMIN') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/dashboard')
      }
    } catch (error) {
      setServerError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to your account"
      subtitle="Enter your details to find your next route."
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="juan.delacruz@email.com"
          autoComplete="email"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        {serverError && <p className="auth-server-error">{serverError}</p>}

        <button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="auth-switch">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </AuthLayout>
  )
}

export default LoginPage
