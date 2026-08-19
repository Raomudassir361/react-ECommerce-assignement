import React, { useState } from 'react';
import {
  Trash2,
  Minus,
  Plus,
  Tag,
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function CartPage({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  onOpenCheckout,
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(20); // Default 20% discount as shown in design
  const [promoApplied, setPromoApplied] = useState(true);
  const [promoMessage, setPromoMessage] = useState('20% discount applied!');

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const discountAmount = subtotal > 0 ? (subtotal * discountPercent) / 100 : 0;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal > 0 ? subtotal - discountAmount + deliveryFee : 0;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'SHOP20' || code === 'SAVE20' || code === 'DISCOUNT20') {
      setDiscountPercent(20);
      setPromoApplied(true);
      setPromoMessage('Promo code applied: 20% OFF!');
    } else if (code === 'SHOP30' || code === 'SAVE30') {
      setDiscountPercent(30);
      setPromoApplied(true);
      setPromoMessage('Special promo code applied: 30% OFF!');
    } else if (code === 'SAVE10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoMessage('Promo code applied: 10% OFF!');
    } else {
      setDiscountPercent(20); // Keep default 20%
      setPromoApplied(true);
      setPromoMessage(`Code '${code}' activated! 20% OFF!`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-black transition-colors"
        >
          Home
        </button>
        <ChevronRight size={14} />
        <span className="font-medium text-black">Cart</span>
      </nav>

      {/* Heading */}
      <h1 className="font-integral text-3xl sm:text-4xl md:text-5xl font-black uppercase text-black mb-8">
        YOUR CART
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center max-w-xl mx-auto my-8 shadow-xs">
          <div className="w-20 h-20 bg-[#F0F0F0] text-gray-400 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={36} />
          </div>
          <h2 className="font-integral text-2xl font-bold uppercase mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Looks like you haven't added any items to your cart yet. Explore our top selling and new arrivals to find your style.
          </p>
          <button
            onClick={() => onNavigate('category')}
            className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
            id="btn-empty-cart-shop"
          >
            <span>Explore Collection</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 shadow-2xs divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="py-5 first:pt-0 last:pb-0 flex gap-4 sm:gap-6"
                id={`cart-item-${item.id}`}
              >
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#F0EEED] rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info and Quantity Controls */}
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* Top Row: Title, Specs, Delete Button */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-black leading-snug">
                        {item.name}
                      </h3>
                      <div className="text-xs sm:text-sm text-gray-500 mt-0.5 space-y-0.5">
                        <p>
                          Size:{' '}
                          <span className="text-gray-700 font-medium">{item.size || 'Large'}</span>
                        </p>
                        <p>
                          Color:{' '}
                          <span className="text-gray-700 font-medium">{item.color || 'White'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Delete Icon in Red */}
                    <button
                      onClick={() => onRemoveItem(item.id, item.size, item.color)}
                      className="text-[#FF3333] hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove item"
                      aria-label="Remove item"
                      id={`btn-remove-${item.id}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Bottom Row: Price & Stepper */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-extrabold text-lg sm:text-xl text-black">
                      ${item.price}
                    </span>

                    {/* Quantity Stepper: [- 1 +] */}
                    <div className="flex items-center bg-[#F0F0F0] rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 gap-3 sm:gap-4">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            Math.max(1, (item.quantity || 1) - 1)
                          )
                        }
                        className="text-black hover:opacity-60 transition-opacity cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="text-xs sm:text-sm font-bold min-w-4 text-center">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            (item.quantity || 1) + 1
                          )
                        }
                        className="text-black hover:opacity-60 transition-opacity cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-5 sm:p-7 shadow-2xs">
            <h2 className="font-bold text-xl sm:text-2xl text-black mb-6">
              Order Summary
            </h2>

            {/* Calculations Breakdown */}
            <div className="space-y-4 text-base">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-black">${subtotal.toFixed(0)}</span>
              </div>

              {/* Discount (-20%) in Red */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Discount (-{discountPercent}%)</span>
                <span className="font-bold text-[#FF3333]">-${discountAmount.toFixed(0)}</span>
              </div>

              {/* Delivery Fee */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="font-bold text-black">${deliveryFee}</span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-lg sm:text-xl">
                  <span className="font-normal text-black">Total</span>
                  <span className="font-extrabold text-black text-xl sm:text-2xl">
                    ${total.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Promo Code Input Box */}
            <form onSubmit={handleApplyPromo} className="flex gap-2.5 mt-6">
              <div className="relative flex-1">
                <Tag
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-[#F0F0F0] text-sm text-black placeholder-gray-400 pl-11 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-black/20"
                  id="promo-code-input"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-gray-800 transition-colors shrink-0 cursor-pointer"
                id="btn-apply-promo"
              >
                Apply
              </button>
            </form>

            {promoApplied && promoMessage && (
              <p className="text-xs font-semibold text-green-600 mt-2 flex items-center gap-1">
                <CheckCircle size={13} />
                <span>{promoMessage}</span>
              </p>
            )}

            {/* Go to Checkout Button */}
            <button
              onClick={onOpenCheckout}
              className="w-full bg-black text-white font-semibold text-sm sm:text-base py-4 px-6 rounded-full hover:bg-gray-800 transition-colors shadow-md mt-6 flex items-center justify-center gap-2 cursor-pointer"
              id="btn-go-to-checkout"
            >
              <span>Go to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
