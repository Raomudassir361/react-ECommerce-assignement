import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
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
  products = [],
  query = {},
  onParamsChange,
  loading = false,
  error = '',
  onNavigate,
  onSelectProduct,
  onAddToCart,
}) {
  const [selectedCategory, setSelectedCategory] = useState(query.category || null);
  const [selectedDressStyle, setSelectedDressStyle] = useState(query.style || null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [maxPrice, setMaxPrice] = useState(Number(query.maxPrice) || 50000);
  const [minPrice] = useState(0);
  const [sortBy, setSortBy] = useState(query.sort || 'newest');
  const [currentPageNum, setCurrentPageNum] = useState(Math.max(1, Number(query.page) || 1));
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const search = query.search || '';
  const pageSize = 6;

  useEffect(() => {
    onParamsChange?.({
      search,
      category: selectedCategory,
      style: selectedDressStyle,
      sort: sortBy,
      maxPrice,
      page: currentPageNum,
      filter: query.filter,
    });
  }, [search, selectedCategory, selectedDressStyle, sortBy, maxPrice, currentPageNum, query.filter, onParamsChange]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (query.filter === 'new-arrivals') {
      const flagged = list.filter((product) => product.isNewArrival);
      list = flagged.length ? flagged : list.slice(0, 4);
    } else if (query.filter === 'top-selling') {
      const flagged = list.filter((product) => product.isTopSelling);
      list = flagged.length ? flagged : list.slice(4, 8);
    } else if (query.filter === 'on-sale') {
      list = list.filter((p) => p.discount != null);
    }

    if (search) {
      const term = search.trim().toLowerCase();
      list = list.filter((product) => `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term));
    }

    if (selectedCategory) {
      list = list.filter((p) => String(p.category).toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedDressStyle) {
      list = list.filter((p) => (p.styles || []).some((style) => String(style).toLowerCase() === selectedDressStyle.toLowerCase()));
    }

    if (selectedColor) list = list.filter((product) => !product.colors?.length || product.colors.some((color) => String(color).toLowerCase() === selectedColor.toLowerCase()));
    if (selectedSize) list = list.filter((product) => !product.sizes?.length || product.sizes.some((size) => String(size).toLowerCase() === selectedSize.toLowerCase()));
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest' && list.some((product) => product.createdAt || product.updatedAt)) {
      list.sort((a, b) => new Date(b.createdAt ?? b.updatedAt ?? 0) - new Date(a.createdAt ?? a.updatedAt ?? 0));
    }

    return list;
  }, [products, query.filter, search, selectedCategory, selectedDressStyle, selectedColor, selectedSize, minPrice, maxPrice, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const pageProducts = filteredProducts.slice((currentPageNum - 1) * pageSize, currentPageNum * pageSize);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedDressStyle(null);
    setSelectedColor(null);
    setSelectedSize(null);
    setMaxPrice(50000);
    setCurrentPageNum(1);
  };

  const currentCategoryTitle =
    selectedDressStyle ? selectedDressStyle.charAt(0).toUpperCase() + selectedDressStyle.slice(1) :
    query.filter === 'new-arrivals' ? 'New Arrivals' :
    query.filter === 'top-selling' ? 'Top Selling' :
    query.filter === 'on-sale' ? 'On Sale Items' : 'All Clothes';

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
            onClick={() => { setSelectedCategory(selectedCategory === cat.id ? null : cat.id); setCurrentPageNum(1); }}
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
          <span className="text-xs font-semibold text-black">Rs {minPrice.toLocaleString('en-PK')} - Rs {maxPrice.toLocaleString('en-PK')}</span>
        </div>
        <input
          type="range"
          min="0"
          max="50000"
          step="500"
          value={maxPrice}
          onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPageNum(1); }}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs font-bold text-black mt-2">
          <span>Rs 0</span>
          <span>Rs 50,000</span>
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
              onClick={() => { setSelectedColor(selectedColor === clr.id ? null : clr.id); setCurrentPageNum(1); }}
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
              onClick={() => { setSelectedSize(selectedSize === sz ? null : sz); setCurrentPageNum(1); }}
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
              onClick={() => { setSelectedDressStyle(selectedDressStyle === style.id ? null : style.id); setCurrentPageNum(1); }}
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
      {error && products.length > 0 && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
      
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
              <span>Showing {filteredProducts.length ? (currentPageNum - 1) * pageSize + 1 : 0}-{Math.min(currentPageNum * pageSize, filteredProducts.length)} of {filteredProducts.length} Products</span>
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline">Sort by:</span>
                <div className="relative inline-block">
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setCurrentPageNum(1); }}
                    className="bg-transparent font-bold text-black appearance-none pr-6 pl-1 py-1 cursor-pointer focus:outline-none"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
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
          {loading ? (
            <p className="text-center py-16 text-gray-500">Loading products…</p>
          ) : error && products.length === 0 ? (
            <p className="text-center py-16 text-red-600" role="alert">{error}</p>
          ) : filteredProducts.length === 0 ? (
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
              {pageProducts.map((product) => (
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
              {Array.from({ length: Math.min(pageCount, 5) }, (_, index) => index + 1).map((page) => (
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
              {pageCount > 5 && <span className="text-gray-400 px-1">…</span>}
            </div>

            <button
              onClick={() => setCurrentPageNum(Math.min(pageCount, currentPageNum + 1))}
              disabled={currentPageNum >= pageCount}
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
