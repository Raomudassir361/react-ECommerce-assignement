import React, { useState, useEffect } from 'react';
import TopBanner from './components/TopBanner.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ProductModal from './components/ProductModal.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import { INITIAL_CART } from './data/products.js';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'category' | 'cart'
  const [categoryParams, setCategoryParams] = useState({
    dressStyle: 'casual',
    filter: null,
    search: '',
  });

  // Cart State (Initialized with 3 items matching Cart.jpg)
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('shopco_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CART;
      }
    }
    return INITIAL_CART;
  });

  // Modals & Toast State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('shopco_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, categoryParams]);

  // Show quick toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Navigation handler
  const handleNavigate = (page: string, params: any = {}) => {
    if (page === 'category') {
      setCategoryParams({
        dressStyle: params?.dressStyle || 'casual',
        filter: params?.filter || null,
        search: params?.search || '',
      });
    }
    setCurrentPage(page);
  };

  // Cart actions
  const handleAddToCart = (product: any) => {
    setCartItems((prevItems: any[]) => {
      const existingIndex = prevItems.findIndex(
        (item: any) =>
          item.id === product.id &&
          item.size === (product.size || 'Large') &&
          item.color === (product.color || 'White')
      );

      const qtyToAdd = product.quantity || 1;

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += qtyToAdd;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            size: product.size || 'Large',
            color: product.color || 'White',
            image: product.image,
            quantity: qtyToAdd,
          },
        ];
      }
    });

    showToast(`"${product.name}" added to cart!`);
  };

  const handleUpdateQuantity = (id: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id, size, color);
      return;
    }
    setCartItems((prev: any[]) =>
      prev.map((item: any) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string, size: string, color: string) => {
    setCartItems((prev: any[]) =>
      prev.filter(
        (item: any) => !(item.id === id && item.size === size && item.color === color)
      )
    );
    showToast('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Open product detail modal
  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  // Totals for checkout
  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const discountAmount = (subtotal * 20) / 100;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const grandTotal = subtotal > 0 ? subtotal - discountAmount + deliveryFee : 0;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Top Banner */}
      <TopBanner onNavigate={handleNavigate} />

      {/* Main Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-sm font-medium animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 size={18} className="text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Routing */}
      <div className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'category' && (
          <CategoryPage
            initialDressStyle={categoryParams.dressStyle}
            initialFilter={categoryParams.filter}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
            onOpenCheckout={() => setIsCheckoutModalOpen(true)}
          />
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Detail / Quick Add Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        discount={discountAmount}
        total={grandTotal}
        onClearCart={handleClearCart}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

