import { useCallback, useEffect, useMemo, useState } from 'react';
import TopBanner from './components/TopBanner.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ProductDetails from './pages/ProductDetail.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import AccountPage from './pages/AccountPage.jsx';
import InfoPage from './pages/InfoPage.jsx';
import { getCurrentCustomer, getMyOrders, getProducts, getRecentReviews, loginCustomer, logoutCustomer, placeOrder, registerCustomer } from './api/storeApi.js';
import { CheckCircle2 } from 'lucide-react';

function readRoute() {
  const { pathname, search } = window.location;
  const params = new URLSearchParams(search);
  if (pathname === '/') return { page: 'home', params };
  if (pathname === '/category') return { page: 'category', params };
  if (pathname === '/cart') return { page: 'cart', params };
  if (pathname === '/account') return { page: 'account', params };
  if (pathname.startsWith('/product/')) return { page: 'product-detail', productId: decodeURIComponent(pathname.slice('/product/'.length)), params };
  if (pathname.startsWith('/info/')) return { page: 'info', slug: decodeURIComponent(pathname.slice('/info/'.length)), params };
  return { page: 'not-found', params };
}

function resolveCustomer(result) {
  const data = result?.data ?? result;
  return data?.customer ?? data?.user ?? data;
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewsError, setReviewsError] = useState('');
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [customer, setCustomer] = useState(null);
  const [accountError, setAccountError] = useState('');
  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('shopco_cart') || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      console.error('Unable to restore the saved cart.', error);
      return [];
    }
  });
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => new URLSearchParams(window.location.search).get('search') || '');
  const [toastMessage, setToastMessage] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setRoute(readRoute());
      setSearchQuery(new URLSearchParams(window.location.search).get('search') || '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((items) => {
        if (active) {
          setProducts(items);
          setCatalogError('');
          const productById = new Map(items.map((product) => [String(product.id), product]));
          setCartItems((cart) => cart.flatMap((item) => {
            const product = productById.get(String(item.id));
            if (!product || product.stock < 1) return [];
            return [{
              ...item,
              name: product.name,
              price: product.price,
              image: product.image,
              stock: product.stock,
              quantity: Math.min(Math.max(1, item.quantity || 1), product.stock),
            }];
          }));
        }
      })
      .catch((error) => {
        if (active) setCatalogError(error.message);
      })
      .finally(() => {
        if (active) setCatalogLoading(false);
      });
    getRecentReviews()
      .then((items) => {
        if (active) {
          setReviews(items);
          setReviewsError('');
        }
      })
      .catch((error) => {
        if (active) setReviewsError(error.message);
      });
    getCurrentCustomer()
      .then((result) => {
        if (!active) return;
        const signedInCustomer = resolveCustomer(result);
        if (['admin', 'administrator'].includes(String(signedInCustomer?.role ?? signedInCustomer?.accountType ?? '').toLowerCase())) {
          setCustomer(null);
          setAccountError('Please sign in with a customer account.');
        } else {
          setCustomer(signedInCustomer);
        }
      })
      .catch((error) => {
        if (error.status !== 401 && error.status !== 403 && active) {
          setAccountError(error.message);
        }
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    localStorage.setItem('shopco_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!customer || route.page !== 'account') return;
    let active = true;
    getMyOrders()
      .then((items) => { if (active) setOrders(items); })
      .catch((error) => { if (active) setAccountError(error.message); })
      .finally(() => { if (active) setOrdersLoaded(true); });
    return () => { active = false; };
  }, [customer, route.page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route.page, route.productId, route.slug]);

  const navigate = useCallback((page, params = {}) => {
    let url = '/';
    if (page === 'category') {
      const query = new URLSearchParams();
      const values = {
        search: params.search,
        category: params.category,
        style: params.style ?? params.dressStyle,
        sort: params.sort,
        maxPrice: params.maxPrice,
        page: params.page,
        filter: params.filter,
      };
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') query.set(key, String(value));
      });
      url = `/category${query.size ? `?${query}` : ''}`;
    } else if (page === 'product-detail') {
      url = `/product/${encodeURIComponent(params.id)}`;
    } else if (page === 'info') {
      url = `/info/${encodeURIComponent(params.slug)}`;
    } else if (page !== 'home') {
      url = `/${page}`;
    }
    window.history.pushState({}, '', url);
    setRoute(readRoute());
    if (page === 'category') setSearchQuery(params.search || '');
  }, []);

  const updateCategoryParams = useCallback((values) => {
    const query = new URLSearchParams(window.location.search);
    Object.entries(values).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) query.delete(key);
      else query.set(key, String(value));
    });
    const url = `/category${query.size ? `?${query}` : ''}`;
    window.history.replaceState({}, '', url);
    setRoute(readRoute());
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 2500);
  };

  const handleAddToCart = (selection) => {
    const product = products.find((item) => String(item.id) === String(selection.id));
    if (!product || product.stock < 1) {
      showToast('This product is out of stock.');
      return;
    }
    const size = selection.size || '';
    const color = selection.color || '';
    const amount = Math.max(1, Number(selection.quantity) || 1);
    setCartItems((items) => {
      const index = items.findIndex((item) => String(item.id) === String(product.id) && item.size === size && item.color === color);
      const current = index < 0 ? 0 : items[index].quantity;
      const next = Math.min(product.stock, current + amount);
      if (index >= 0) {
        return items.map((item, itemIndex) => itemIndex === index ? { ...item, quantity: next } : item);
      }
      return [...items, {
        id: product.id,
        name: product.name,
        price: product.price,
        size,
        color,
        image: product.image,
        stock: product.stock,
        quantity: next,
      }];
    });
    showToast(`"${product.name}" added to cart!`);
  };

  const handleUpdateQuantity = (id, size, color, quantity) => {
    const product = products.find((item) => String(item.id) === String(id));
    if (quantity <= 0) {
      setCartItems((items) => items.filter((item) => !(String(item.id) === String(id) && item.size === size && item.color === color)));
      return;
    }
    const maximum = product?.stock ?? 0;
    setCartItems((items) => items.map((item) =>
      String(item.id) === String(id) && item.size === size && item.color === color
        ? { ...item, quantity: Math.min(quantity, maximum) }
        : item
    ));
  };

  const handleRemoveItem = (id, size, color) => {
    setCartItems((items) => items.filter((item) => !(String(item.id) === String(id) && item.size === size && item.color === color)));
    showToast('Item removed from cart.');
  };

  const handleSelectProduct = (product) => navigate('product-detail', { id: product.id });

  const handleLogin = async (credentials) => {
    setAccountError('');
    try {
      const result = await loginCustomer(credentials);
      let signedInCustomer = resolveCustomer(result);
      try {
        signedInCustomer = resolveCustomer(await getCurrentCustomer());
      } catch (sessionError) {
        if (!signedInCustomer) throw sessionError;
      }
      if (['admin', 'administrator'].includes(String(signedInCustomer?.role ?? signedInCustomer?.accountType ?? '').toLowerCase())) {
        await logoutCustomer();
        throw new Error('Please sign in with a customer account.');
      }
      setCustomer(signedInCustomer);
      setOrdersLoaded(false);
    } catch (error) {
      setAccountError(error.message);
      throw error;
    }
  };

  const handleRegister = async (details) => {
    setAccountError('');
    try {
      await registerCustomer(details);
      await handleLogin({ email: details.email, password: details.password });
    } catch (error) {
      setAccountError(error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logoutCustomer();
      setCustomer(null);
      setOrders([]);
      setOrdersLoaded(false);
    } catch (error) {
      setAccountError(error.message);
    }
  };

  const handlePlaceOrder = async (customerDetails) => {
    setCheckoutError('');
    const order = {
      name: customerDetails.fullName,
      email: customerDetails.email,
      address: customerDetails.address,
      items: cartItems.map(({ id, quantity }) => ({ productId: id, quantity })),
      paymentMethod: 'Cash on Delivery',
    };
    try {
      const result = await placeOrder(order);
      setCartItems([]);
      getProducts()
        .then(setProducts)
        .catch((refreshError) => setCatalogError(refreshError.message));
      return result?.data?.order ?? result?.order ?? result?.data ?? result;
    } catch (error) {
      setCheckoutError(error.message);
      throw error;
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const deliveryFee = subtotal > 0 && subtotal < 5000 ? 250 : 0;
  const grandTotal = subtotal + tax + deliveryFee;
  const selectedProduct = useMemo(
    () => products.find((product) => String(product.id) === route.productId),
    [products, route.productId],
  );
  const categoryParams = Object.fromEntries(route.params.entries());

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans selection:bg-black selection:text-white">
      <TopBanner onNavigate={navigate} />
      <Navbar
        currentPage={route.page}
        onNavigate={navigate}
        cartCount={totalCartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-sm font-medium animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 size={18} className="text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}
      <div className="flex-1">
        {route.page === 'home' && (
          <HomePage products={products} reviews={reviews} reviewsError={reviewsError} loading={catalogLoading} error={catalogError} onNavigate={navigate} onSelectProduct={handleSelectProduct} onAddToCart={handleAddToCart} />
        )}
        {route.page === 'category' && (
          <CategoryPage key={window.location.search} products={products} query={categoryParams} onParamsChange={updateCategoryParams} loading={catalogLoading} error={catalogError} onNavigate={navigate} onSelectProduct={handleSelectProduct} onAddToCart={handleAddToCart} />
        )}
        {route.page === 'cart' && (
          <CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onNavigate={navigate} onOpenCheckout={() => { setCheckoutError(''); setIsCheckoutModalOpen(true); }} />
        )}
        {route.page === 'product-detail' && (selectedProduct ? (
          <ProductDetails key={selectedProduct.id} product={selectedProduct} products={products} customer={customer} onAddToCart={handleAddToCart} onNavigate={navigate} onSelectProduct={handleSelectProduct} onLoginRequired={() => navigate('account')} onReviewsChanged={() => getRecentReviews().then((items) => { setReviews(items); setReviewsError(''); }).catch((error) => setReviewsError(error.message))} />
        ) : catalogLoading ? (
          <p className="max-w-7xl mx-auto px-4 py-16 text-gray-500">Loading product…</p>
        ) : (
          <p className="max-w-7xl mx-auto px-4 py-16" role="alert">{catalogError || 'Product not found.'}</p>
        ))}
        {route.page === 'account' && (
          <AccountPage customer={customer} orders={orders} loadingOrders={customer && !ordersLoaded} error={accountError} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} />
        )}
        {route.page === 'info' && <InfoPage slug={route.slug} />}
        {route.page === 'not-found' && <main className="max-w-7xl mx-auto px-4 py-16"><h1 className="text-2xl font-bold">Page not found</h1></main>}
      </div>
      <Footer onNavigate={navigate} />
      {isCheckoutModalOpen && <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        tax={tax}
        deliveryFee={deliveryFee}
        total={grandTotal}
        error={checkoutError}
        onPlaceOrder={handlePlaceOrder}
        onNavigate={navigate}
      />}
    </div>
  );
}
