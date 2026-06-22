# 🩸 LifeFlow - Blood Donation Platform

## 📌 Project Overview
LifeFlow (RaktaNex) is a full-stack blood donation platform that connects donors, volunteers, and administrators to streamline blood request fulfillment and fundraising. This repository contains the Next.js client application with some server-side Next API handlers (Stripe checkout + session handling). The client integrates with a backend REST API for users, donation requests, and funds.

## 🌐 Live URL
[https://raktanex-client.vercel.app](https://raktanex-client.vercel.app)

## ✨ Key Features

### Authentication & Authorization
- JWT-based authentication (Better-Auth with JWT plugin)
- Role-based access control: `admin`, `donor`, `volunteer`
- Protected routes and token verification
- User registration with avatar upload (ImageBB)
- Profile management with edit functionality

### Donor Dashboard Features
- Create and manage donation requests (CRUD)
- View recent donation requests (max 3) on dashboard
- Filter by status: `pending`, `inprogress`, `done`, `canceled`
- Pagination for data tables
- Update donation status (done / canceled)
- View detailed donation request information

### Admin Dashboard Features
- Full user management (block/unblock, role change)
- Manage all donation requests platform-wide
- View platform statistics (total users, total funds, total requests)
- Data visualization (daily/weekly/monthly charts)

### Volunteer Dashboard Features
- View and filter all donation requests
- Update donation status for any request (role-checked)

### Public Features
- Browse all pending donation requests
- View detailed donation request information
- Search donors by blood group, district, and upazila
- Make donations through Stripe checkout integration
- Contact form for inquiries
- Responsive and modern UI design with animations

### Additional Features
- Real-time donation status tracking (client updates)
- PDF export functionality for search results (client utility)
- Animated UI with Framer Motion/AOS

## 🛠️ Technologies Used

### Frontend (detected from repository)
- Next.js (App Router) — `next`
- React — `react`, `react-dom`
- Tailwind CSS
- Framer Motion
- React Hook Form
- React Hot Toast
- React Icons
- Heroui component library (`@heroui/react`)
- Stripe (client lib: `@stripe/stripe-js`)

### Backend (integration notes)
- This client expects a backend REST API (users, donation requests, funds). The client also includes Next API routes that use the server-side Stripe SDK.
- Server-side libraries used in the client server routes: `stripe`, `mongodb` (via Better-Auth adapter), and `better-auth` for auth handling.

## 📦 NPM Packages Used (root package.json)

See the exact versions in [package.json](package.json). Key packages:

- @better-auth/mongo-adapter
- better-auth
- @heroui/react, @heroui/styles
- @stripe/stripe-js
- stripe
- framer-motion
- mongodb
- next
- react, react-dom
- react-hook-form
- react-hot-toast
- react-icons

Dev dependencies:

- tailwindcss
- eslint
- eslint-config-next

## 🔐 Environment Variables

Add these to your `.env.local` or environment when running locally or deploying.

- `NEXT_PUBLIC_BASE_URL` — Base URL of your backend REST API (e.g., `http://localhost:5000`). Used by client API wrappers.
- `NEXT_PUBLIC_IMAGE_UPLOAD_API` — ImageBB API key for avatar uploads (client-side upload URL).
- `BETTER_AUTH_URL` — Base URL used by Better-Auth client (optional/configurable).
- `MONGO_DB_URI` — MongoDB connection string (used by `src/lib/auth.js` for Better-Auth adapter).
- `STRIPE_SECRET_KEY` — Stripe secret key (server-only; used in `src/lib/stripe.js`).

Example `.env.local` (do not commit secrets):

```
NEXT_PUBLIC_BASE_URL=http://localhost:5000
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_api_key
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB_URI=mongodb+srv://user:pass@cluster0.mongodb.net/raktanex
STRIPE_SECRET_KEY=sk_test_...
```

## ⚙️ API Endpoints (client-observed)

The client calls the following backend endpoints (hosted at `NEXT_PUBLIC_BASE_URL`). Some routes are implemented as Next API routes inside this repo (Stripe flow).

- Authentication: handled via Better-Auth endpoint at `/api/auth/*` (see `src/app/api/auth/[...all]/route.js`).

- Donation Requests
  - `POST /api/donation-request` — create donation request (auth)
  - `PATCH /api/donation-request/:id` — update own donation request
  - `DELETE /api/donation-request/:id` — delete own donation request
  - `GET /api/donation-requests` — list public donation requests (optional `status` query)
  - `GET /api/donation-requests/pending` — list pending requests
  - `GET /api/donation-request/:id` — get own donation request
  - `GET /api/donation-requests/:id` — get donation request details (auth required by client)
  - `GET /api/myDonations?requesterId=` — list donation requests by requester
  - `PATCH /api/donation-request-status/:id` — update donation status (public/private usage)
  - `PATCH /api/donation-requests/:id/donate` — confirm donation by donor

- Admin / Volunteer
  - `GET /api/admin/donation-requests/:id`
  - `PATCH /api/admin/donation-requests/:id/status`
  - `DELETE /api/admin/donation-requests/:id`
  - `PATCH /api/admin/donation-request/:id`

- Users
  - `GET /api/users?page=&limit=&status=` — list users (admin)
  - `GET /api/users/vole` — list volunteers
  - `PATCH /api/users/:id/status` — update user status
  - `PATCH /api/users/:id/role` — change user role
  - `PATCH /api/users/:id` — update profile

- Donor Search
  - `GET /api/donors?name=&bloodGroup=&district=&upazila=` — search donors

- Funds / Stripe
  - `POST /api/checkout_sessions` — Next server route creates Stripe checkout session (`src/app/api/checkout_sessions/route.js`)
  - `POST /api/save-fund` — Next server route retrieves Stripe session and forwards fund creation to backend (`src/app/api/save-fund/route.js` -> POST `${NEXT_PUBLIC_BASE_URL}/api/funds`)
  - Backend expected: `GET /api/funds`, `GET /api/funds/total`, `POST /api/funds`

## 🔎 Database Schemas (inferred)

Based on client usage, these models are expected on the backend:

- User (inferred)
  - `id`, `name`, `email`, `image`
  - `role`: `donor` | `volunteer` | `admin`
  - `status`: `active` | `blocked`
  - `bloodGroup`, `division`, `district`, `upazila`

- DonationRequest (inferred)
  - `id`, `requesterId`, `title`, `description`, `bloodGroup`, `units`, `contact`
  - `division`, `district`, `upazila`
  - `donationStatus`: `pending` | `inprogress` | `done` | `canceled`
  - timestamps and donor confirmation info

- Fund (inferred)
  - `id`, `userId`, `userName`, `userEmail`, `amount`, `stripeSessionId`, `date`

## 🔐 Authentication System

- Auth is provided via `better-auth` with a MongoDB adapter (`src/lib/auth.js`). JWT plugin is enabled; client uses `src/lib/auth-client.js` to obtain tokens and session data.
- Protected client requests attach `Authorization: Bearer <token>` headers via helper functions in `src/lib/actions`.

## 🚀 Local Development

1. Install dependencies

```bash
npm install
```

2. Create `.env.local` and supply the environment variables listed above.

3. Run the dev server

```bash
npm run dev
```

4. Open http://localhost:3000

Notes: this repository is the Next.js client and contains Next API routes for Stripe. The main backend REST API (users, donations, funds) must be available at `NEXT_PUBLIC_BASE_URL` for full functionality.

## 🗂️ Important Files

- `package.json` — client dependencies and scripts
- `src/lib/auth.js` — Better-Auth server config and Mongo adapter
- `src/lib/auth-client.js` — Better-Auth client setup
- `src/lib/stripe.js` — Stripe server initialization
- `src/app/api/checkout_sessions/route.js` — create Stripe checkout sessions
- `src/app/api/save-fund/route.js` — retrieve Stripe session and forward to backend
- `src/lib/api/*` and `src/lib/actions/*` — client wrappers for backend API endpoints

## ✅ Recommendations

- Provide/confirm the backend REST API implementation and endpoints listed above.
- Keep `STRIPE_SECRET_KEY` and `MONGO_DB_URI` out of client-side code and environment exposures.
- Add a `.env.example` and deployment instructions for both client and backend (Vercel + a Node/Mongo host).

---

If you want, I can scaffold a simple Express + Mongoose backend that implements the expected endpoints and schemas, add `.env.example`, and update this README with screenshots and deployment steps. Would you like me to proceed?
