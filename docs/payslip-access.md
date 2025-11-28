# Payslip Access and Authentication

## Summary

The payslip endpoints are defined inside `commonConfig.urls` and rely on the JWT bearer token stored in `localStorage`. The UI never fetches payslip data without using that token, and the backend enforces authorization, so you cannot access another employee's payslip **without signing in as them** (@src/app/components/commonConfig.js#1-29).

## How access is restricted

1. **Token dependency**: `commonConfig.tokens.accessToken` is referenced everywhere a request touches the API (see `getAccessToken()` in `app/utils/utils.js` and the axios instance in `src/axios.js`). Any payload to `/getpayslip`, `/generatePayslipPdf`, or `/getLetestPayslipMonths` uses `Authorization: Bearer <token>` based on the currently logged-in user (@src/app/utils/utils.js#165-189, @src/axios.js#1-16).
2. **Session initialization**: `contexts/JWTAuthContext.js` manages login/logout and populates Redux with `state.userDetails.user`, persisting the bearer token only on successful authentication; without going through `login()`, no token exists, so requests fail before reaching employee data (@src/app/contexts/JWTAuthContext.js#13-176).
3. **Server-side checks**: Even if you guessed a valid `payslip` URL, the backend will inspect the access token and match it against the requesting user's identity/role, rejecting mismatched records. The frontend never exposes raw user IDs or bypasses that token check.

## How to verify

1. Open the app without logging in and open DevTools → Network. You will notice `Authorization` headers are absent and requests to `/getLetestPayslipMonths` get blocked immediately (`401 Unauthorized`). Attempting to add a token manually without a session still fails because the token must be minted by the login flow.
2. Log in as one user, visit `/home`, and the payslip card fetches only that user’s months. Trying to change the `/generatePayslipPdf/<month>/<year>` URL to another employee’s identifier results in a backend error because the backend cross-checks the token-scoped user ID.

## Conclusion

There is no supported path to grab other employees’ payslips without authenticating as that user. The combination of `commonConfig` URLs, the axios token payload, and the JWT context guard all enforce this. If you need cross-user reports, you would have to implement a new role-aware endpoint (e.g., HR admin) with proper backend authorization, not by reusing the personal payslip API.
