# Patient Manager

A patient management dashboard built with React developed for a challenge as part of a selection process. Lets you view, create, and edit patient records with form validation and toast notifications.

## Running locally

To run the server locally, you have to install the dependencies and start the server.

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs on `http://localhost:5173` by default (Vite's default port).

Other available scripts:

```bash
npm run build    # Type-check + production build
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Mock environment

The app has a built-in mock mode controlled by environment variables in `.env`:

```
VITE_API_BASE_URL = https://63bedcf7f5cfc0949b634fc8.mockapi.io
VITE_USE_MOCK = true
```

When `VITE_USE_MOCK` is `true`, the patient service returns data from a local JSON file (`src/services/mockPatients.json`) instead of hitting the API. This means you can work on the app without any backend or network connection.

Set it to `false` to use the real mockapi.io endpoint (or point `VITE_API_BASE_URL` to your own backend). The service layer handles the switch transparently — everything else in the app stays the same.

New patients created or edits made are stored in Zustand's in-memory state, so they won't persist across page reloads.

## Design decisions

**State management — Zustand over Redux/Context**

Zustand keeps things simple, and given the low complexity required by the app, I didn't find a reason to add all the boilerplate Redux requires. There are two stores: `PatientsStore` for patient data and CRUD operations, and `uiStore` for modal and snackbar state. I

**Data fetching — React Query**

React Query handles the initial fetch with built-in caching, retry logic, and loading/error states. It's configured with a 60s stale time and one retry on failure. The `usePatients` hook bridges React Query's fetch with Zustand's store hydration so data flows through a single source of truth.

**Forms — React Hook Form + Zod**

React Hook Form handles form state without re-rendering the whole form on every keystroke. Zod defines the patient schema and validation rules, and `@hookform/resolvers` connects them. The same Zod schema is also used as the TypeScript type source via `z.infer`, so the types and validation stay in sync.

**Styling — Tailwind CSS**

I find Tailwind more comfortable to use compared to other styling solutions. Custom animations for snackbar enter/exit are defined in `index.css`.

**Component structure**

UI primitives (`Button`, `Input`, `Modal`, `Select`, `Typography`) live in `src/components/ui/` and are generic/reusable. Feature components (`PatientCard`, `PatientList`, `PatientModal`, `SnackbarContainer`) use these primitives for specific app functionality. Modal rendering uses a React portal so it sits outside the DOM hierarchy.

## Stack

- **React 19** + TypeScript 5.9
- **Vite 7** — bundler and dev server
- **Zustand** — state management
- **React Query** — async data fetching and caching
- **React Hook Form** + **Zod** — form handling and validation
- **Tailwind CSS v4** — utility-first styling
- **Lucide React** — icons
- **clsx** — conditional class name helper

Note: I decided to add a few fields that are not returned by the API, to have more freedom in design and to make the app seem more fit for a Patient Managing Dashboard. 

I added email, phone, dateOfBirth, status, bloodType and appointmentDate to the Patient as fields that can be filled in the form.