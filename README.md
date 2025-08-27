# README — Digital Wallet Frontend (React + Redux Toolkit + RTK Query)

 A modern, role-based Digital Wallet frontend (similar to bKash/Nagad) built with React, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS (v4), and shadcn/ui. It consumes a REST API to power dashboards for   Users, Agents, and Admins with solid UX, charts, and reusable tables.


# 🚀 ✨ Features (at a glance)

- Public site: Home, About, Features, Contact, FAQ 

- Auth: Login, Register (User/Agent), JWT persistence, role-based redirects

- User Dashboard: Wallet balance, quick actions (Deposit, Withdraw, Send), recent transactions, filters + pagination

- Agent Dashboard: Cash-in/out summary, serve user deposits/withdrawals, agent transactions, commission history

- Admin Dashboard: Global stats, manage users/agents, review all transactions (advanced filters & search)

- UI/UX: Light/Dark theme, responsive layout,  toasts,

- Area/Bar charts (Recharts), reusable DataTable (TanStack Table)

- DX: Type-safe APIs (RTK Query), modular slices, clean folder structure

---



## 🛠️ 🧱 Tech Stack

- **Core**: React + TypeScript, React Router

- **State**: Redux Toolkit + RTK Query

- **UI**: Tailwind CSS v4, shadcn/ui, Lucide/Tabler icons

- **Tables**: TanStack Table

- **Charts**: Recharts

- **Guided Tour**: react-joyride (or shepherd.js/driver.js alternative)

- **Auth**: JWT (persisted; backend validates)

- **Tooling**: Vite, ESLint, Prettier

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Validation**: Zod
- **Authentication**: JWT, Passport
- **Password Hashing**: bcryptjs
- **Error Handling**: Centralized, Global Error is handled with a custom AppError Function.
- **Authorization**: Role-based (user, agent, admin)

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access (`user`, `agent`, `admin`)
- Protected routes with role checks, like no one can access the admin's route except user is an admin. This action is the same for agents' and users' routes.

---


## 📦📁 Folder Structure (MVC Pettern)

```
src/
  redux/
    store.ts/
      rtk apis             # Redux store
   
  components/
    ui/                    # shadcn/ui primitives
    reusableTable/         # DataTable wrapper (TanStack Table)
    charts/                # chart primitives & helpers
    modules/
      dashboard/
        OverviewSectionCards.tsx
        DashboardTimeseriesChart.tsx
  hooks/
    use-mobile.ts
  lib/
    auth.ts                # token helpers
    format.ts              # currency/date formatters
    tour.ts                # guided tour config
  pages/
    public/                # Home, About, Features, Contact, FAQ
    dashboard/             # User/Agent/Admin dashboards
  redux/
    features/
      auth/
        auth.api.ts
        auth.slice.ts
      dashboard/
        dashboard.api.ts
      transactions/
        transaction.api.ts
      agent/
        agent.api.ts
      admin/
        admin.api.ts
  styles/
    globals.css
  types/
    index.d.ts             # shared interfaces (IUser, ITransaction, etc.)
  routes/
       router.tsx             # React Router + role routes
```

### Backend
```
src
├── app
│ ├── config # Environment configs (e.g., database, secrets)
│ ├── error-helpers # Custom error classes & error formatters
│ ├── helpers # Utility functions (e.g., token generator)
│ ├── interfaces # TypeScript interfaces
│ ├── middlewares # Error handler, auth check, RBAC
│ ├── modules # Domain logic (user, wallet, transaction, auth, etc.)
│ ├── routes # Centralized route declarations
│ └── utils # Common utilities (e.g., response sender)
├── app.ts # Express app config and middlewares
├── server.ts # App startup and DB connection
.env # Environment variables
.env.example # Sample env for setup
.gitignore
eslint.config.mjs
package.json
tsconfig.json

```
---

# Backend 🧪 API Endpoints (Sample)

Main api: https://digital-walet-backend.vercel.app/api/v1

### Auth
- `POST /auth/register` — Register as user/agent/admin
- `POST /auth/login` — Login and receive access token

### Wallet
- `GET /wallets/me` — Get own wallet info
- `POST /wallets/deposit` — Deposit money
- `POST /wallets/withdraw` — Withdraw money
- `POST /wallets/send-money` — Send money to another user

### Agent
- `POST /wallets/agent/cash-in` — Cash-in (requires approval)
- `POST /wallets/agent/cash-out` — Cash-out (requires approval)
- Agents can view their commission history via  
    `GET /api/v1/transactions/commissions`

### Admin
- `GET /admin/all-wallets` — View all wallets
- `GET /admin/all-transaction` — View all Transactions
- `PATCH /admin/wallets/block/:id` — Block a wallet
- `PATCH /admin/wallets/unblock/:id` — Unblock a wallet
- `PATCH /admin/agents/approve/:id` — Approve agent (Agent's id)
- `PATCH /admin/agents/suspend/:id` — Suspend agent (Agent's id)

### Transactions
- `GET /transactions/me` — View own transactions

---

## 3. ⚙️ Environment Variables


### Create .env (or .env.local) at project root:
```
VITE_API_BASE_URL=https://your-backend.example.com/api/v1
```

## 4. 🚀 Getting Started, Start the Server

### For Development:

```bash
npm run dev
bun dev (recommend) 
```
### For Production:

```bash
npm run build
npm run start
bun build
bun start
```

## 🔐 Authentication Flow
- Login returns a JWT → stored in localStorage under VITE_JWT_STORAGE_KEY.

- RTK Query baseQuery attaches Authorization: Bearer <token> automatically.

- Post-login redirect is role-based:
-   - user → /dashboard/user
-   - agent → /dashboard/agent
-   - admin → /dashboard/admin

## 🗂️ Routing & Role Guards
- Public routes: /, /about, /features, /contact, /faq, /pricing?

- Auth routes: /login, /register

- Protected routes: /dashboard/*
-   A wrapper checks role from the store; mismatched roles get redirected.

## 📊 Data Visualization
- Overview KPI cards (wallet balance, cash-in/out, pending, tx count)

- Time-series chart (transactions & volume) with 7d/30d/90d filter

- Reusable DataTable with pagination, search, and column formatters


## 🔎 Filters & Search
- Transaction list supports type, date range, status

- Debounced search bar for quick lookup

- Pagination via server or client (configurable per page)


## 🧹 Code Quality
- ESLint + Prettier preconfigured

- Commit history should reflect feature branches & PRs

- Use TypeScript types for all API responses & UI models


## 🌐 Deployment
- Vercel/Netlify for frontend

- Set env vars in platform settings

- Ensure CORS & HTTPS on backend
- Add live URLs in README once deployed

## 🙌 Credits
- Icons: lucide-react / @tabler/icons-react

- UI: shadcn/ui

- Charts: Recharts

- Tables: TanStack Table
  



# Frequently Asked Questions (FAQ)

## What is this Digital Wallet?
This is a role-based digital wallet platform for Users, Agents and Admins. Users can hold wallets, send/receive money, and view transaction history. Agents can perform cash-in/cash-out on behalf of users. Admins manage users, agents and overall system settings.

## How do I create an account?
Click Register and fill the signup form. After registration, confirm your email (if verification is enabled) and login.

## What roles exist and what are the differences?
- **User:** Personal wallet, send/receive money, withdraw, view transactions.  
- **Agent:** Operator who can perform cash-in / cash-out for users.  
- **Admin:** Full system access — manage users/agents, view all transactions and system settings.

## How do I add money to my wallet?
Users typically receive cash-in via an Agent. Agents perform a cash-in transaction which increases the user's wallet balance. If a direct payment integration exists, use the Deposit/Cash-in flow in the UI.

## How can I withdraw money?
Withdrawals are processed via Agents or via the withdrawal feature in the app. Create a withdraw request, follow confirmation steps, and your agent or the system will process it.

## What are transaction fees and how are they displayed?
Transaction fees (if any) are shown on confirmation screens and in transaction details. Admins can configure fees in the backend. The UI shows `amount`, `fee`, and `commission` fields for transparency.

## How does pagination, filtering and search work?
Lists use server-side pagination. Use the search input to filter results (query param `searchTerm`) and dropdowns for filters (e.g., `role`, `status`). Page size and page number are sent via `limit` and `page`.

## What should I do if a transaction is missing or incorrect?
Check the transaction details in the app (date, from/to, status). If it’s missing or wrong, contact support with the transaction ID and timestamp. For agent operations, include the agent ID.

## How is security handled?
The platform uses JWT-based authentication, role checks, bcrypt-protected passwords, and server-side validation. Keep passwords safe and enable 2FA if offered.

## Can I test the API / integrate with the backend?
Yes — the backend exposes REST endpoints (e.g. `/api/v1/dashboard/overview`, `/api/v1/admin/all-users`, `/api/v1/admin/transactions-summery`). Use documented endpoints and login to perform authenticated calls.

## How to handle disputes or refund requests?
Open a support ticket with transaction IDs, timestamps, and a description. Admins will investigate transaction logs and respond per policy.

## What are common troubleshooting steps?
- Ensure you are logged in with correct role.  
- Inspect network tab for failed calls and capture logs.  
- Clear browser cache for stale bundles.  
- Confirm backend availability and token validity.

## Where can I find help or report bugs?
Use the Contact page or create an issue in the repository (if public). For production, use the official operator support channel.



📫 Author
Hamza Aryan Sapnil
📍 Bangladesh
🌐 LinkedIn • 💻 Full Stack Developer

📄 License
This project is licensed for educational purposes under MIT.
