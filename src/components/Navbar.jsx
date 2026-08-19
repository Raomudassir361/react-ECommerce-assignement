import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({
  currentPage,
  onNavigate,
  cartCount = 0,
  searchQuery = '',
  onSearchChange,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('category', { search: searchQuery });
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          
          {/* Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3 lg:gap-8">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 -ml-1 text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="font-integral text-2xl sm:text-3xl font-black tracking-tighter text-black hover:opacity-85 transition-opacity cursor-pointer flex items-center"
              id="brand-logo-btn"
            >
              SHOP.CO
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-base text-gray-700 font-normal">
            {/* Direct Shop Link */}
            <button
              onClick={() => onNavigate('category')}
              className={`py-2 hover:text-black font-medium transition-colors cursor-pointer ${
                currentPage === 'category' ? 'text-black font-bold' : ''
              }`}
              id="nav-shop-btn"
            >
              Shop
            </button>

            <button
              onClick={() => onNavigate('category', { filter: 'on-sale' })}
              className="py-2 hover:text-black transition-colors cursor-pointer"
              id="nav-link-onsale"
            >
              On Sale
            </button>
            <button
              onClick={() => onNavigate('category', { filter: 'new-arrivals' })}
              className="py-2 hover:text-black transition-colors cursor-pointer"
              id="nav-link-newarrivals"
            >
              New Arrivals
            </button>
            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('brands-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('brands-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="py-2 hover:text-black transition-colors cursor-pointer"
              id="nav-link-brands"
            >
              Brands
            </button>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full bg-[#F0F0F0] text-sm text-black placeholder-gray-400 pl-11 pr-4 py-3 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                id="main-search-input"
              />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Open search"
              id="mobile-search-toggle"
            >
              <Search size={22} />
            </button>

            {/* Cart Icon with Counter */}
            <button
              onClick={() => onNavigate('cart')}
              className={`relative p-2 rounded-full transition-all cursor-pointer ${
                currentPage === 'cart'
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-gray-100'
              }`}
              aria-label="View shopping cart"
              id="nav-cart-btn"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[11px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account Icon */}
            <button
              onClick={() => onNavigate('cart')}
              className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="User Account"
              id="nav-user-btn"
            >
              <User size={22} />
            </button>
          </div>

        </div>

        {/* Mobile Search Input Expanded */}
        {isMobileSearchOpen && (
          <div className="md:hidden pb-3 pt-1 animate-in fade-in duration-150">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                autoFocus
                className="w-full bg-[#F0F0F0] text-sm text-black placeholder-gray-400 pl-11 pr-4 py-2.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-black/20"
                id="mobile-search-input"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex">
          <div className="bg-white w-4/5 max-w-sm h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <span className="font-integral text-2xl font-black text-black">
                  SHOP.CO
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-gray-500 hover:text-black rounded-lg"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="py-6 space-y-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('category');
                  }}
                  className={`w-full text-left py-2.5 text-lg font-bold flex items-center justify-between transition-colors ${
                    currentPage === 'category' ? 'text-black font-extrabold' : 'text-gray-800 hover:text-black'
                  }`}
                  id="mobile-nav-shop-btn"
                >
                  <span>Shop</span>
                  <ArrowRight size={18} className="text-gray-400" />
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('category', { filter: 'on-sale' });
                  }}
                  className="block w-full text-left py-2.5 text-base font-medium text-gray-800 hover:text-black"
                >
                  On Sale
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('category', { filter: 'new-arrivals' });
                  }}
                  className="block w-full text-left py-2.5 text-base font-medium text-gray-800 hover:text-black"
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (currentPage !== 'home') {
                      onNavigate('home');
                      setTimeout(() => {
                        document.getElementById('brands-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      document.getElementById('brands-section')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block w-full text-left py-2.5 text-base font-medium text-gray-800 hover:text-black"
                >
                  Brands
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('cart');
                }}
                className="w-full bg-black text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart size={18} />
                <span>Go to Cart ({cartCount})</span>
              </button>
            </div>
          </div>

          <div
            className="flex-1"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        </div>
      )}
    </header>
  );
}
