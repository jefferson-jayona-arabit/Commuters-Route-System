import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import InputField from '../components/InputField.jsx'
import { registerUser } from '../services/authService.js'
import { validateRegisterForm } from '../utils/validators.js'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
}

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setServerError('')
    setSuccessMessage('')

    const validationErrors = validateRegisterForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
      })
      setSuccessMessage('Account created. Redirecting to log in…')
      setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      setServerError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Create an account"
      title="Register as a commuter"
      subtitle="Save your trips and get personalized route suggestions."
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-form-row">
          <InputField
            label="First name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            error={errors.firstName}
            placeholder="Juan"
            autoComplete="given-name"
          />
          <InputField
            label="Last name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            error={errors.lastName}
            placeholder="Dela Cruz"
            autoComplete="family-name"
          />
        </div>

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
          label="Phone number (optional)"
          name="phoneNumber"
          type="tel"
          value={form.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          placeholder="09XX XXX XXXX"
          autoComplete="tel"
        />

        <div className="auth-form-row">
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
          <InputField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Re-enter password"
            autoComplete="new-password"
          />
        </div>

        {serverError && <p className="auth-server-error">{serverError}</p>}
        {successMessage && <p className="auth-success">{successMessage}</p>}

        <button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </AuthLayout>
  )
}

export default RegisterPage
