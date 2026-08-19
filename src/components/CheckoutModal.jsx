import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, ArrowRight, Package } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cartItems, subtotal, discount, total, onClearCart, onNavigate }) {
  if (!isOpen) return null;

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    zip: '97477',
    cardNumber: '•••• •••• •••• 4242',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('success');
    if (onClearCart) {
      onClearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 bg-gray-100 hover:bg-gray-200 text-black rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-integral text-xl sm:text-2xl font-bold uppercase">
                Secure Checkout
              </span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mb-6">
              Complete your order with encrypted 256-bit SSL protection.
            </p>

            {/* Order Items Preview */}
            <div className="bg-[#F0F0F0] rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <span>Summary ({cartItems.length} items)</span>
                <span className="text-black font-extrabold text-sm">${total.toFixed(2)}</span>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-gray-700">
                    <span className="truncate max-w-[240px] font-medium">
                      {item.quantity}x {item.name} ({item.size})
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#F0F0F0] text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F0F0F0] text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    City & Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={`${formData.city}, ${formData.zip}`}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F0F0F0] text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Shipping Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#F0F0F0] text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Payment Method
                </label>
                <div className="flex items-center justify-between bg-[#F0F0F0] px-4 py-3 rounded-xl text-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard size={18} className="text-gray-600" />
                    <span className="font-medium text-gray-900">{formData.cardNumber}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-green-700 font-semibold bg-green-100 px-2 py-0.5 rounded-md">
                    <ShieldCheck size={14} />
                    <span>Verified</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-bold text-sm py-4 rounded-full hover:bg-gray-800 transition-colors shadow-lg mt-2 flex items-center justify-center gap-2 cursor-pointer"
                id="btn-confirm-order"
              >
                <span>Pay ${total.toFixed(2)} & Place Order</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle size={36} />
            </div>
            <h3 className="font-integral text-2xl sm:text-3xl font-bold uppercase mb-2">
              Order Confirmed!
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
              Thank you, <strong>{formData.fullName}</strong>! We've received your order and sent a receipt to <strong>{formData.email}</strong>.
            </p>

            <div className="bg-[#F0F0F0] p-4 rounded-2xl max-w-sm mx-auto text-left mb-6 text-xs text-gray-700 space-y-1.5">
              <div className="flex justify-between font-bold text-black border-b border-gray-200 pb-1 mb-1">
                <span>Order #SHOP-{Math.floor(100000 + Math.random() * 900000)}</span>
                <span className="text-green-600">Paid</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Express Delivery (2-3 Business Days)</span>
              </div>
              <div className="flex justify-between font-semibold text-black pt-1">
                <span>Total Charged:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  onClose();
                  onNavigate('category');
                }}
                className="bg-black text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Package size={16} />
                <span>Continue Shopping</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('home');
                }}
                className="bg-[#F0F0F0] text-black px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
