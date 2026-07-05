/**
 * Sample placeholder rows only — mirrors the shape of the `users` table.
 * Swap this out for the real API response in the next phase
 * (see services/api.js).
 */
export const MOCK_USERS = [
  {
    user_id: 1,
    first_name: 'Maria',
    last_name: 'Santos',
    email: 'maria.santos@example.com',
    phone_number: '0917 123 4567',
    role: 'admin',
    status: 'active',
    created_at: '2026-01-14',
  },
  {
    user_id: 2,
    first_name: 'Jonas',
    last_name: 'Dela Cruz',
    email: 'jonas.delacruz@example.com',
    phone_number: '0928 554 1290',
    role: 'user',
    status: 'active',
    created_at: '2026-02-02',
  },
  {
    user_id: 3,
    first_name: 'Ana',
    last_name: 'Reyes',
    email: 'ana.reyes@example.com',
    phone_number: '0933 771 4420',
    role: 'user',
    status: 'inactive',
    created_at: '2026-02-19',
  },
  {
    user_id: 4,
    first_name: 'Carlo',
    last_name: 'Villanueva',
    email: 'carlo.villanueva@example.com',
    phone_number: '0905 220 8891',
    role: 'user',
    status: 'active',
    created_at: '2026-03-05',
  },
  {
    user_id: 5,
    first_name: 'Bea',
    last_name: 'Fernandez',
    email: 'bea.fernandez@example.com',
    phone_number: '0917 662 3305',
    role: 'admin',
    status: 'active',
    created_at: '2026-03-21',
  },
  {
    user_id: 6,
    first_name: 'Miguel',
    last_name: 'Torres',
    email: 'miguel.torres@example.com',
    phone_number: '0939 410 7762',
    role: 'user',
    status: 'inactive',
    created_at: '2026-04-08',
  },
]

export const EMPTY_USER_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone_number: '',
  address: '',
  role: 'user',
  status: 'active',
  profile_photo: null,
}