# Dynamic Homepage Implementation Guide

## Vision

Build a personalized, responsive landing page that welcomes each user, summarizes their most important data, and gives quick paths to the tools they use daily. This replaces a static dashboard with an adaptive experience that reflects their role, permissions, and context.

## Goals

1. Show personalized greetings and key profile information pulled from the authenticated user store.
2. Surface the most relevant cards (profile summary, payslip download links, upcoming holidays, calendar) and allow quick actions.
3. Keep a consistent responsive layout so the experience works on desktop and tablet/mobile.
4. Reuse existing cards/plugins (ProfileSummaryCard, Payslip summary, Calendar, etc.) while allowing future customization per module.

---

## Prerequisites

- App bootstraps via `src/index.jsx` → uses `App.jsx` → feeds into `MatxLayout`. The homepage route is defined in `routes.jsx` and renders `Home` component inside the protected layout (@src/app/routes.jsx#36-78).
- Global utilities: `commonConfig.urls` for API endpoints, `getAccessToken()` from `app/utils/utils.js` for authenticated calls, `SnackbarUtils` for feedback.
- State is persisted via Redux (`Store.js`, `RootReducer.js`) and the current user appears under `state.userDetails.user`.
- Layout components (AppGrid, Matx cards) rely on MUI’s responsive `Grid` system, so reuse those tokens.

---

## Implementation Outline

### 1. Route and Layout

- Ensure `commonRoutes.home` points to the new landing page route in `src/app/components/commonRoutes.js`.
- `routes.jsx` already maps `commonRoutes.home` to `Home`. The route is wrapped by `AuthGuard` and rendered inside the selected `MatxLayout` (@src/app/routes.jsx#36-78).
- Extend `Home.jsx` to orchestrate the landing page section. You can split sections into sub-components (e.g., `GreetingSection`, `ActionTiles`) for clarity.

### 2. Data & Personalization

- Pull the authenticated user from Redux with `useSelector((state) => state.userDetails?.user)` and store role/permission IDs from `localStorage` if needed (see current Home component @src/app/components/Home.jsx#190-305).
- Greeting logic can derive from `new Date().getHours()` as shown (`getGreeting()` returns morning/afternoon/evening).
- Display notice banners for outstanding tasks (IT proof reminder) using `useEffect` to call endpoints such as `commonConfig.urls.itproofcheck` and toggle visibility based on response (@src/app/components/Home.jsx#190-284).

### 3. Key Cards

- **Profile Summary**: `ProfileSummaryCard` already shows labeled data; it consumes Redux user data. Ensure it is positioned in the primary grid column and styled consistently (@src/app/components/ProfileSummaryCard.jsx#1-68).
- **Payslip Overview**: The `PayslipCard` in `Home.jsx` fetches months via `/getLetestPayslipMonths` and downloads PDFs via `/generatePayslipPdf`. It already splits the most recent months into two lists for better readability (@src/app/components/Home.jsx#67-187). Maintain the download logic (blob response) and `Button` + `DownloadIcon` styling.
- **Calendar & Holidays**: Reuse `CalenderCard` and `HolidayCard` components, or design new cards that query `/holidays` and `/getMonths`. Keep them inside the responsive grid so they stack on smaller screens (@src/app/components/Home.jsx#202-330).
- **Action Tiles**: Create lightweight cards/buttons for quick navigation (e.g., Go to tasks, payslips, leave application). Use MUI Cards with `onClick={() => navigate(commonRoutes.x)}`.
- Establish a `quickLinks` array for each user role, then map to rendered buttons. Use `Grid` spacing to keep layout even.

### 4. Responsive Layout

- Wrap cards within `<Grid container spacing={2}>` and assign breakpoints such as `xs={12}`, `sm={6}`, `md={4}` so cards stack vertically on phones and display in columns on desktop (@src/app/components/Home.jsx#285-330).
- For full-height cards, manage `style={{ height: '100%' }}` and use `CardContent` for padding consistency.
- Utilize `theme.palette.mode` to toggle background colors and maintain contrast.
- For extra customization, wrap key sections with media query styles (e.g., `@media (max-width: 600px)` for large banners or animation toggles). Keep inline styles minimal; prefer styled components to reuse (see `StyledDiv` and `StyledCard` definitions at the top of `Home.jsx`).

### 5. Quick Access Controls

- Offer buttons linking to the most-used tools (payslips, leave apply, tasks). Compose them from a config object:
  ```js
  const quickLinks = [
    { label: 'Payslips', route: commonRoutes.payslips },
    { label: 'Leave History', route: commonRoutes.leaves.leaveHistory },
    ...
  ];
  ```
  Then map to `<Button onClick={() => navigate(link.route)}>` inside a card section.
- Consider highlighting frequently clicked tasks by tracking (via redux/analytics) and re-ordering `quickLinks` dynamically later.

### 6. API & Data Hooks

- Use Axios with headers built from `getAccessToken()` for all backend interactions. Wrap repeated logic in a custom hook (`useApi` already exists for GET lists). Create hooks like `useProfileReminder(userId)` if you need reusability.
- Maintain error handling via `SnackbarUtils.error(...)` and disable buttons while loading.
- Cache data when appropriate by storing in component state or redux slices to avoid repeated fetches during rerenders.

### 7. State & Permissions

- Use the Redux `userAccess` slice (`state.userAccess`) or `userAccessPermissions` to tailor which cards appear (e.g., hide payslip download for vendors). The existing `shouldShowSalarySlips()` helper inspects `roleId` stored in `localStorage`. Extend similarly for other features.
- Persist quick preferences (like expanded sections) using `localStorage` or `redux-persist` if changes should survive refreshes.

### 8. Accessibility & Feedback

- Mark buttons with `aria-labels`, especially icon-only actions (e.g., download icon). Provide fallback text when cards are empty (e.g., "No payslips available.").
- Animate highlights (warning banner, active cards) using CSS transitions or `@keyframes` as shown to draw attention without overwhelming the user (@src/app/components/Home.jsx#246-282).

### 9. Testing & Validation

- Manual: Run `npm start`, log in, and visit `/home`. Verify responsive breakpoints by resizing the viewport and checking data loads for payslips, holidays, etc.
- Automated: Write jest/react-testing-library tests for `Home` to mock `axios` calls (if needed) and confirm cards / quick links render when Redux provides user data. Use `axios-mock-adapter` (already a dev dependency) to stub API responses.

---

## Deliverables Checklist

- [ ] `Home.jsx` orchestrating layout/quick access logic plus reused cards.
- [ ] Top-level constants for URLs/state kept inside `commonConfig` and `commonRoutes`.
- [ ] Responsive design using MUI `Grid` and styled components (like `StyledCard`, `StyledDiv`).
- [ ] API hooks handling tokens + snackbars for success/error flows.
- [ ] Personalized text (greetings, reminders) drawing data from Redux and localStorage.
- [ ] Quick Access buttons wired to `navigate()` and kept consistent with defined routes.

## Optional Enhancements

- Add animated summaries (e.g., overall payout graph) using `@mui/lab`/`recharts` with data from `getpayslip`.
- Introduce role-based sections (managers see team stats, employees see timesheet widgets).
- Store homepage layout preferences so users can hide/show cards.

Use this guide as a blueprint; adapt each section to the data and UX needs that arise while you implement the Dynamic Homepage feature.
