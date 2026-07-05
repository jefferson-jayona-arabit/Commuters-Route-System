# Commuters Route System — Login & Register

Two separate, independently runnable projects:

```
project/
├── frontend/   React.js (Vite)
└── backend/    Spring Boot (Maven)
```

Scope: this build covers **Register** and **Login** only, wired end-to-end against
the `users` table from `commuters_route_system.sql`.

## 1. Database

Run `commuters_route_system.sql` in MySQL Workbench first (from the earlier step)
so the `commuters_route_system` database and `users` table exist.

## 2. Backend (Spring Boot)

```
cd backend
```

1. Open `src/main/resources/application.properties` and set your real MySQL
   username/password/port.
2. Replace `app.jwt.secret` with your own long random string.
3. Run it:
   ```
   mvn spring-boot:run
   ```
   The API starts on `http://localhost:8080`.

**Layered architecture:**

| Layer | Package | Files |
|---|---|---|
| Controller | `controller` | `AuthController` |
| Service (interface) | `service` | `AuthService` |
| Service (implementation) | `service.impl` | `AuthServiceImpl` |
| DAO (Repository) | `repository` | `UserRepository` |
| Model (Entity) | `model` | `User`, `UserRole`, `UserStatus` |
| DTO | `dto` | `RegisterRequest`, `LoginRequest`, `AuthResponse`, `ApiResponse` |
| Configuration | `config` | `SecurityConfig`, `JwtUtil` |
| Exceptions | `exception` | `GlobalExceptionHandler` + custom exceptions |

**Endpoints:**

- `POST /api/auth/register` — body: `{ firstName, lastName, email, password, phoneNumber }`
- `POST /api/auth/login` — body: `{ email, password }` → returns a JWT + user info

## 3. Frontend (React)

```
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`. `.env` already points `VITE_API_BASE_URL` at
`http://localhost:8080/api` — update it if your backend runs elsewhere.

**Folder structure:**

```
src/
├── components/   InputField, AuthLayout, RouteLineDecor (reusable UI)
├── pages/        LoginPage, RegisterPage
├── services/     api.js (axios instance), authService.js (API calls)
├── styles/       auth.css (design system + layout)
├── utils/        validators.js (client-side form validation)
└── assets/       static assets
```

## Notes

- Passwords are hashed with BCrypt on the backend — never stored in plain text.
- The JWT returned on login is stored in `localStorage` on the frontend for
  simplicity; swap for an httpOnly cookie if you want stronger XSS protection.
- CORS is restricted to `http://localhost:5173` in `SecurityConfig` — update
  `app.cors.allowed-origin` if you deploy the frontend elsewhere.
