import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Check, Star } from 'lucide-react';
import StarRating from './StarRating.jsx';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState(product.size || 'Large');
  const [selectedColor, setSelectedColor] = useState(product.color || 'White');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const availableSizes = product.availableSizes || ['Small', 'Medium', 'Large', 'X-Large'];
  const availableColors = product.availableColors || ['White', 'Black', 'Blue'];

  const colorMap = {
    White: 'bg-white border-gray-300',
    Black: 'bg-black text-white',
    Blue: 'bg-[#0047FF] text-white',
    Red: 'bg-[#FF3333] text-white',
    Green: 'bg-[#00C12B] text-white',
    Yellow: 'bg-[#F5DD06] text-black',
    Orange: 'bg-[#F57906] text-white',
    Pink: 'bg-[#F506A4] text-white',
    Purple: 'bg-[#7B06F5] text-white',
  };

  const handleAdd = () => {
    onAddToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-gray-100 hover:bg-gray-200 text-black rounded-full flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Image */}
          <div className="bg-[#F0EEED] rounded-2xl overflow-hidden flex items-center justify-center aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-integral text-2xl font-bold text-black uppercase leading-tight mb-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="mb-3">
                <StarRating rating={product.rating} />
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-extrabold text-black">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl font-bold text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-semibold text-[#FF3333] bg-[#FF3333]/10 px-2.5 py-0.5 rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {product.description || 'This stylish product is designed with modern premium fabrics for everyday wear.'}
              </p>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                  Select Colors
                </p>
                <div className="flex items-center gap-2">
                  {availableColors.map((clr) => (
                    <button
                      key={clr}
                      onClick={() => setSelectedColor(clr)}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-transform cursor-pointer ${
                        colorMap[clr] || 'bg-gray-200'
                      } ${selectedColor === clr ? 'ring-2 ring-black ring-offset-2 scale-105' : 'hover:opacity-90'}`}
                      title={clr}
                    >
                      {selectedColor === clr && (
                        <Check size={16} className={clr === 'White' || clr === 'Yellow' ? 'text-black' : 'text-white'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                  Choose Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
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
            </div>

            {/* Stepper + Add To Cart Button */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-3 gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-black hover:opacity-60 cursor-pointer"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-bold min-w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-black hover:opacity-60 cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-black text-white hover:bg-gray-800 shadow-md'
                }`}
                id="modal-add-to-cart-btn"
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
