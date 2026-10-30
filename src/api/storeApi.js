const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');
const PKR_FORMATTER = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 2 });

export function formatPrice(amount) {
  return `Rs ${PKR_FORMATTER.format(Number(amount) || 0)}`;
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(result?.message || result?.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return result;
}

function normalizeProduct(product) {
  const styles = product.styles ?? (product.dressStyle || product.style ? [product.dressStyle ?? product.style] : []);
  const sizes = product.sizes ?? product.availableSizes ?? [];
  const colors = product.colors ?? product.availableColors ?? [];
  return {
    ...product,
    id: String(product.id ?? product._id),
    name: product.name ?? product.title ?? '',
    price: Number(product.price ?? 0),
    oldPrice: product.oldPrice ?? product.originalPrice ?? null,
    originalPrice: product.oldPrice ?? product.originalPrice ?? null,
    styles: Array.isArray(styles) ? styles : [styles],
    dressStyle: product.dressStyle ?? (Array.isArray(styles) ? styles[0] : styles) ?? '',
    sizes: Array.isArray(sizes) ? sizes : [sizes],
    availableSizes: Array.isArray(sizes) ? sizes : [sizes],
    colors: Array.isArray(colors) ? colors : [colors],
    availableColors: Array.isArray(colors) ? colors : [colors],
    image: product.image ?? product.images?.[0] ?? '',
    stock: Number(product.stock ?? 0),
    rating: Number(product.rating ?? 0),
    description: product.description ?? '',
  };
}

export async function getProducts() {
  const result = await request('/products');
  const data = result?.data ?? result;
  const products = Array.isArray(data) ? data : data?.products;
  if (!Array.isArray(products)) {
    throw new Error('The products API returned an invalid response.');
  }
  return products.map(normalizeProduct);
}

export async function getRecentReviews() {
  const result = await request('/reviews');
  const data = result?.data ?? result;
  return Array.isArray(data) ? data : data?.reviews ?? [];
}

export async function getProductReviews(productId) {
  const result = await request(`/products/${encodeURIComponent(productId)}/reviews`);
  const data = result?.data ?? result;
  return Array.isArray(data) ? data : data?.reviews ?? [];
}

export function postProductReview(productId, review) {
  return request(`/products/${encodeURIComponent(productId)}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
}

export function registerCustomer(details) {
  return request('/auth/register', { method: 'POST', body: JSON.stringify(details) });
}

export function loginCustomer(credentials) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
}

export function logoutCustomer() {
  return request('/auth/logout', { method: 'POST' });
}

export function getCurrentCustomer() {
  return request('/auth/customer');
}

export async function getMyOrders() {
  const result = await request('/orders/mine');
  const data = result?.data ?? result;
  return Array.isArray(data) ? data : data?.orders ?? [];
}

export function placeOrder(order) {
  return request('/orders', { method: 'POST', body: JSON.stringify(order) });
}

export function subscribeToNewsletter(email) {
  return request('/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
}
