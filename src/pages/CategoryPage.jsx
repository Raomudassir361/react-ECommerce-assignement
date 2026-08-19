import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { PRODUCTS } from '../data/products.js';
import {
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  Check,
  ArrowLeft,
  ArrowRight,
  X,
  RotateCcw
} from 'lucide-react';

const CATEGORIES = [
  { id: 't-shirts', label: 'T-shirts' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'shirts', label: 'Shirts' },
  { id: 'hoodie', label: 'Hoodie' },
  { id: 'jeans', label: 'Jeans' },
];

const COLORS = [
  { id: 'green', name: 'Green', bg: 'bg-[#00C12B]' },
  { id: 'red', name: 'Red', bg: 'bg-[#F50606]' },
  { id: 'yellow', name: 'Yellow', bg: 'bg-[#F5DD06]' },
  { id: 'orange', name: 'Orange', bg: 'bg-[#F57906]' },
  { id: 'cyan', name: 'Cyan', bg: 'bg-[#06CAF5]' },
  { id: 'blue', name: 'Blue', bg: 'bg-[#063AF5]' },
  { id: 'purple', name: 'Purple', bg: 'bg-[#7D06F5]' },
  { id: 'pink', name: 'Pink', bg: 'bg-[#F506A4]' },
  { id: 'white', name: 'White', bg: 'bg-white border border-gray-200' },
  { id: 'black', name: 'Black', bg: 'bg-black' },
];

const SIZES = [
  'XX-Small',
  'X-Small',
  'Small',
  'Medium',
  'Large',
  'X-Large',
  'XX-Large',
  '3X-Large',
  '4X-Large',
];

const DRESS_STYLES = [
  { id: 'casual', label: 'Casual' },
  { id: 'formal', label: 'Formal' },
  { id: 'party', label: 'Party' },
  { id: 'gym', label: 'Gym' },
];

export default function CategoryPage({
  initialDressStyle = 'casual',
  initialFilter = null,
  onNavigate,
  onSelectProduct,
  onAddToCart,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDressStyle, setSelectedDressStyle] = useState(initialDressStyle);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [maxPrice, setMaxPrice] = useState(250);
  const [minPrice, setMinPrice] = useState(50);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (initialFilter === 'new-arrivals') {
      list = list.filter((p) => p.isNewArrival);
    } else if (initialFilter === 'top-selling') {
      list = list.filter((p) => p.isTopSelling);
    } else if (initialFilter === 'on-sale') {
      list = list.filter((p) => p.discount != null);
    }

    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedDressStyle) {
      list = list.filter((p) => p.dressStyle === selectedDressStyle);
    }

    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [initialFilter, selectedCategory, selectedDressStyle, minPrice, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedDressStyle('casual');
    setSelectedColor('blue');
    setSelectedSize('Large');
    setMinPrice(50);
    setMaxPrice(250);
  };

  const currentCategoryTitle =
    selectedDressStyle ? selectedDressStyle.charAt(0).toUpperCase() + selectedDressStyle.slice(1) :
    initialFilter === 'new-arrivals' ? 'New Arrivals' :
    initialFilter === 'top-selling' ? 'Top Selling' :
    initialFilter === 'on-sale' ? 'On Sale Items' : 'All Clothes';

  const filterSidebarContent = (
    <div className="space-y-5 text-black">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="font-bold text-lg text-black">Filters</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="text-xs text-gray-400 hover:text-black flex items-center gap-1 cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
          <SlidersHorizontal size={18} className="text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2.5 pb-5 border-b border-gray-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={`w-full flex items-center justify-between text-sm py-1 transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'font-bold text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <span>{cat.label}</span>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        ))}
      </div>

      {/* Price */}
      <div className="pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-base text-black">Price</h4>
          <span className="text-xs font-semibold text-black">${minPrice} - ${maxPrice}</span>
        </div>
        <input
          type="range"
          min="50"
          max="350"
          step="5"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs font-bold text-black mt-2">
          <span>$50</span>
          <span>$200</span>
        </div>
      </div>

      {/* Colors */}
      <div className="pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-base text-black">Colors</h4>
        </div>
        <div className="grid grid-cols-5 gap-2.5">
          {COLORS.map((clr) => (
            <button
              key={clr.id}
              onClick={() => setSelectedColor(selectedColor === clr.id ? null : clr.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform cursor-pointer ${clr.bg} ${
                selectedColor === clr.id ? 'ring-2 ring-black ring-offset-2 scale-105' : 'hover:scale-105'
              }`}
              title={clr.name}
            >
              {selectedColor === clr.id && (
                <Check
                  size={14}
                  className={clr.id === 'white' || clr.id === 'yellow' ? 'text-black' : 'text-white'}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-base text-black">Size</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedSize === sz
                  ? 'bg-black text-white'
                  : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Style */}
      <div className="pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-base text-black">Dress Style</h4>
        </div>
        <div className="space-y-2">
          {DRESS_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedDressStyle(selectedDressStyle === style.id ? null : style.id)}
              className={`w-full flex items-center justify-between text-sm py-1 transition-colors cursor-pointer ${
                selectedDressStyle === style.id
                  ? 'font-bold text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <span>{style.label}</span>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Apply Filter Button */}
      <button
        onClick={() => setIsMobileFilterOpen(false)}
        className="w-full bg-black text-white font-semibold text-sm py-3.5 rounded-full hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
        id="btn-apply-filter"
      >
        Apply Filter
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-black transition-colors"
        >
          Home
        </button>
        <ChevronRight size={14} />
        <span className="font-medium text-black">{currentCategoryTitle}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Desktop Left Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-24 shadow-2xs">
            {filterSidebarContent}
          </div>
        </aside>

        {/* Right Main Product Section */}
        <main className="lg:col-span-9">
          
          {/* Header Row: Title, Count, Sort, Mobile Filter Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center justify-between">
              <h1 className="font-integral text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-black">
                {currentCategoryTitle}
              </h1>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-[#F0F0F0] text-black px-3.5 py-2 rounded-full text-xs font-semibold"
                id="btn-mobile-filter-open"
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs sm:text-sm text-gray-500">
              <span>Showing 1-9 of 100 Products</span>
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline">Sort by:</span>
                <div className="relative inline-block">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-bold text-black appearance-none pr-6 pl-1 py-1 cursor-pointer focus:outline-none"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#F0F0F0] rounded-2xl p-8">
              <p className="text-lg font-bold text-black mb-2">No products match your selected filters.</p>
              <p className="text-sm text-gray-500 mb-6">Try clearing some filters or changing price ranges.</p>
              <button
                onClick={resetFilters}
                className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 mt-12 pt-6"></div>

          {/* Pagination Matching Design */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))}
              disabled={currentPageNum === 1}
              className="border border-gray-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold text-black hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPageNum(page)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
                    currentPageNum === page
                      ? 'bg-black/10 text-black'
                      : 'text-gray-500 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-400 px-1">...</span>
              {[8, 9, 10].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPageNum(page)}
                  className={`hidden sm:flex w-9 h-9 rounded-lg font-bold items-center justify-center transition-colors cursor-pointer ${
                    currentPageNum === page
                      ? 'bg-black/10 text-black'
                      : 'text-gray-500 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPageNum(Math.min(10, currentPageNum + 1))}
              className="border border-gray-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold text-black hover:bg-gray-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-integral text-xl font-bold">Filters</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-gray-500 hover:text-black rounded-lg"
              >
                <X size={22} />
              </button>
            </div>
            {filterSidebarContent}
          </div>
        </div>
      )}

    </div>
  );
}
