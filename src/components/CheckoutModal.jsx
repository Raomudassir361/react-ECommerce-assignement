import { useState } from 'react';
import { X, CheckCircle, Banknote, ArrowRight, Package } from 'lucide-react';
import { formatPrice } from '../api/storeApi.js';

export default function CheckoutModal({ isOpen, onClose, cartItems, subtotal, tax, deliveryFee, total, error, onPlaceOrder, onNavigate }) {
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({ fullName: '', email: '', address: '' });
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const placedOrder = await onPlaceOrder(formData);
      setOrder({ ...(placedOrder || {}), total: placedOrder?.total ?? total });
      setStep('success');
    } catch (submitError) {
      console.error('Unable to place order.', submitError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200" onClick={(event) => event.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 bg-gray-100 hover:bg-gray-200 text-black rounded-full flex items-center justify-center transition-colors cursor-pointer" aria-label="Close checkout">
          <X size={20} />
        </button>
        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-integral text-xl sm:text-2xl font-bold uppercase">Checkout</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mb-6">Place your order with Cash on Delivery.</p>
            <div className="bg-[#F0F0F0] rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <span>Summary ({cartItems.length} items)</span>
                <span className="text-black font-extrabold text-sm">{formatPrice(total)}</span>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex justify-between text-xs text-gray-700">
                    <span className="truncate max-w-60 font-medium">{item.quantity}x {item.name} {item.size && `(${item.size})`}</span>
                    <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-2 pt-2 space-y-1 text-xs text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span>Tax (5%)</span><span>{formatPrice(tax)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{formatPrice(deliveryFee)}</span></div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Full Name
                <input type="text" required autoComplete="name" value={formData.fullName} onChange={(event) => setFormData({ ...formData, fullName: event.target.value })} className="mt-1 w-full bg-[#F0F0F0] text-sm px-4 py-3 rounded-xl font-normal focus:outline-none focus:ring-2 focus:ring-black/20" />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block text-xs font-bold text-gray-700 uppercase">
                  Email Address
                  <input type="email" required autoComplete="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="mt-1 w-full bg-[#F0F0F0] text-sm px-4 py-3 rounded-xl font-normal focus:outline-none focus:ring-2 focus:ring-black/20" />
                </label>
                <div>
                  <span className="block text-xs font-bold text-gray-700 uppercase mb-1">Payment Method</span>
                  <div className="flex items-center gap-2 bg-[#F0F0F0] px-4 py-3 rounded-xl text-sm min-h-[46px]">
                    <Banknote size={18} className="text-gray-600" />
                    <span className="font-medium text-gray-900">Cash on Delivery</span>
                  </div>
                </div>
              </div>
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Shipping Address
                <input type="text" required autoComplete="street-address" value={formData.address} onChange={(event) => setFormData({ ...formData, address: event.target.value })} className="mt-1 w-full bg-[#F0F0F0] text-sm px-4 py-3 rounded-xl font-normal focus:outline-none focus:ring-2 focus:ring-black/20" />
              </label>
              <button type="submit" disabled={submitting || cartItems.length === 0} className="w-full bg-black text-white font-bold text-sm py-4 rounded-full hover:bg-gray-800 transition-colors shadow-lg mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60" id="btn-confirm-order">
                <span>{submitting ? 'Placing order…' : `Place order · ${formatPrice(total)}`}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"><CheckCircle size={36} /></div>
            <h3 className="font-integral text-2xl sm:text-3xl font-bold uppercase mb-2">Order Confirmed!</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
              Thank you, <strong>{formData.fullName}</strong>! We've received your Cash on Delivery order. A confirmation will be sent to <strong>{formData.email}</strong>.
            </p>
            <div className="bg-[#F0F0F0] p-4 rounded-2xl max-w-sm mx-auto text-left mb-6 text-xs text-gray-700 space-y-1.5">
              <div className="flex justify-between font-bold text-black border-b border-gray-200 pb-1 mb-1">
                <span>Order #{order?.id ?? order?._id ?? 'Confirmed'}</span>
                <span className="text-green-600">{order?.status ?? 'Confirmed'}</span>
              </div>
              <div className="flex justify-between"><span>Payment:</span><span>Cash on Delivery</span></div>
              <div className="flex justify-between font-semibold text-black pt-1"><span>Order total:</span><span>{formatPrice(order?.total ?? total)}</span></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => { onClose(); onNavigate('category'); }} className="bg-black text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <Package size={16} /><span>Continue Shopping</span>
              </button>
              <button onClick={() => { onClose(); onNavigate('home'); }} className="bg-[#F0F0F0] text-black px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors cursor-pointer">Return to Home</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
