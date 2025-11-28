# Dynamic Homepage

## Purpose

- Provide authenticated users with a **personalized, responsive launch pad** that surfaces the tools, actions, and information they access the most, without extra navigation.
- Deliver a high-level snapshot of their daily priorities (timesheets, approvals, reports, alerts) to improve productivity and adoption of existing modules.
- Align with the Matx layout system already used across the product so the experience feels cohesive.

## Research Findings

- `src/app/views/AppHome.jsx` is currently a stub that renders an empty `<div>`, which means the homepage can be entirely replaced with a richer experience.
- Authentication state (user identity, role, tokens) is managed through `src/app/contexts/JWTAuthContext.js` and Redux slices such as `userDetails`, `userAccess`, and `userPermissions`, making role-aware personalization feasible right after login.
- Navigation metadata is tracked through `src/app/redux/actions/NavigationAction.js` and reducers under `redux/ducks`, so quick-link recommendations can be generated from stored `mostRecent` or `mostVisited` records.
- Existing modules (Timesheet, Reports, Leave, Referral, Payroll, User/Profile management) are all under `src/app/components/*Module/`, and their routes already exist in the router tree (`views/dashboard/DashboardRoutes.js`, `views/sessions/SessionRoutes.js`, etc.). These can be linked from the homepage without touching individual modules.

## Proposed Implementation

### 1. Entry Point & Routing

- Create `src/app/views/dashboard/DynamicHomepage.jsx` (or enhance `AppHome.jsx`) to render the new experience.
- Register the component in `views/dashboard/DashboardRoutes.js` so `/` or `/dashboard` routes resolve directly to the dynamic homepage for authenticated users.
- Keep `AppHome` as a wrapper if future static content is needed; otherwise remove it in favor of the new view.

### 2. Data Sources & Aggregation

- Pull user context from `JWTAuthContext` and Redux slices (`userDetails`, `userPermissions`, `currentClient`, `navigation`).
- Use existing hooks—`useAuth`, `useFetchData`, `useRefreshData`, `useIdleTimeout`—to perform initial data fetches and refresh widgets on demand.
- Combine client/server data from modules such as `api/timesheet.js`, `TermsAndPolicy`, and `commonConfig.urls` to populate pending actions (e.g., open approvals, unread documents).
- Create a selector (e.g., `selectHomepageWidgets`) that produces: `quickLinks` (based on navigation history), `insights` (KPIs like pending timesheets), and `alerts` (notifications from Redux/snackbar state).

### 3. Personalization & Permissions

- Leverage `authRoles` (`src/app/auth/authRoles.js`) plus permissions stored via `JWTAuthContext` to filter widgets/actions to what the user can access.
- Track module usage in the Redux `navigation` reducer (`NavigationReducer.js`) and maintain a list of `frequentlyUsedModules` to show under “Recently Used” or “Favorites”.
- Read layout preferences from `SettingsContext` (`useSettings`) so users can toggle between condensed/expanded views; persist widget visibility and order through Redux or local storage.

### 4. Layout, Components & Responsiveness

- Build the layout using Matx components (`MatxLayout`, `MatxTheme`, `MatxGrid`, `MatxSuspense`) so the homepage matches the global style.
- Define sections such as:
  1. **Top Actions** – quick buttons linking to routes inside `components/*Module` (e.g., leave request, timesheet, referral).
  2. **Recently Used/Favorites** – cards generated from navigation history.
  3. **Pending Items** – list tiles for things like unapproved timesheets, unread documents, payout approvals.
  4. **Insights** – KPI cards or small charts (can reuse `AppPaginate` components for lists).
  5. **Notifications/Announcements** – use `AppSnackbar` or custom card for alerts from Redux `snackbar` slice.
- Use Material-UI `Grid` with breakpoint props to ensure cards stack for tablet/mobile resolutions; Matx default theme already includes breakpoints.

### 5. Quick Actions & UX

- Buttons should route to already implemented modules (via `commonRoutes` or `dashboard` routes) without rewriting module logic.
- Lazy-load heavy components using `Loadable`/`MatxSuspense` and show `MatxLoading` skeletons during data fetches.
- Provide inline feedback with `SnackbarUtils` (e.g., “Report ready” after quick action completes).

## How It Will Work

1. Upon login, authenticated routes direct users to `DynamicHomepage` instead of the blank `AppHome` view.
2. The homepage loads user context (role, permissions, navigation history) and pulls data from API helpers + Redux slices to create widget data.
3. Widgets render with personalized quick actions, pending items, and tool recommendations filtered by role/permission.
4. Users can pin/arrange widgets via the `SettingsContext` interface; preferences drive what shows on next login.
5. Frequent usage of modules is reflected automatically via navigation analytics, ensuring the homepage stays aligned with evolving usage patterns.

## Benefits of This Change

- **Meaningful first impression** – users land on a homepage that already shows what matters to them.
- **Faster workflows** – quick actions and insights reduce navigation depth for routine tasks.
- **Role-aware clarity** – only authorized, relevant tools appear, matching the JWT contexts already in place.
- **Consistent design** – uses Matx layout/tools already deployed across the product, so styling and breakpoints already match.

## Next Steps

1. Build the `DynamicHomepage` prototype with placeholder widgets to verify layout and responsiveness.
2. Integrate selectors and API calls for real data from Timesheet, Reports, Leave, and Document modules.
3. Tie personalization controls into `SettingsContext`/Redux so users can toggle visibility and order of widgets.
4. Validate access restrictions using `authRoles` and `JWTAuthContext` data to avoid exposing unauthorized modules.
5. Monitor navigation data (via `navigation` reducer) after rollout to adjust quick-link prioritization.

Let me know if you would like mocks for the homepage layout or a checklist for implementation tasks.
