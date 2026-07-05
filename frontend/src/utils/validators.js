const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^$|^[0-9+\-\s]{7,20}$/

export function validateLoginForm({ email, password }) {
  const errors = {}

  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!password) {
    errors.password = 'Password is required'
  }

  return errors
}

export function validateRegisterForm({ firstName, lastName, email, phoneNumber, password, confirmPassword }) {
  const errors = {}

  if (!firstName.trim()) errors.firstName = 'First name is required'
  if (!lastName.trim()) errors.lastName = 'Last name is required'

  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Enter a valid email address'
  }

  if (phoneNumber && !PHONE_REGEX.test(phoneNumber)) {
    errors.phoneNumber = 'Enter a valid phone number'
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errors.password = 'Password must include a letter and a number'
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}
