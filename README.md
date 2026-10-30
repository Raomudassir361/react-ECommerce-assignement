# SHOP.CO Storefront

Customer-facing React and Vite storefront. Product, account, order, review, and newsletter data is served by the backend API; the cart is stored in the browser.

## Local development

Run the API at `http://localhost:5000`, then start the storefront:

```sh
npm install
npm run dev
```

Vite proxies `/api` to the local backend. The browser uses same-origin `/api` by default, so `VITE_API_BASE_URL` can remain unset.

## Build and deploy

```sh
npm run build
```

Deploy this repository to Vercel. `vercel.json` sends `/api/*` to `https://ecommerce-backend-roan-tau.vercel.app/api/*` before applying the SPA fallback for deep links. Add `https://react-e-commerce-assignement.vercel.app` to the backend's `FRONTEND_ORIGINS` so browser requests and the login cookie are accepted.

If configuring a direct API URL instead, set `VITE_API_BASE_URL` to `https://ecommerce-backend-roan-tau.vercel.app/api` and rebuild. The backend must allow cross-site cookies with `COOKIE_SAMESITE=none`.

Delivery coverage, contact details, and legal text on the information pages must be confirmed by the store owner before launch.
