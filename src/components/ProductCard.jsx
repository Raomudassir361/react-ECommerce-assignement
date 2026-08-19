import StarRating from './StarRating.jsx';
import { ShoppingBag, Eye } from 'lucide-react';

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
}) {
  const {
    id,
    name,
    price,
    originalPrice,
    discount,
    rating,
    image,
  } = product;

  return (
    <div
      className="group flex flex-col cursor-pointer transition-all duration-300"
      id={`product-card-${id}`}
      onClick={() => onSelectProduct && onSelectProduct(product)}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-[#F0EEED] rounded-2xl overflow-hidden mb-3.5 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart && onAddToCart(product);
            }}
            className="bg-white text-black hover:bg-black hover:text-white p-3 rounded-full shadow-lg transition-colors cursor-pointer transform translate-y-2 group-hover:translate-y-0 duration-200"
            title="Add to Cart"
            id={`quick-add-${id}`}
          >
            <ShoppingBag size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct && onSelectProduct(product);
            }}
            className="bg-white text-black hover:bg-black hover:text-white p-3 rounded-full shadow-lg transition-colors cursor-pointer transform translate-y-2 group-hover:translate-y-0 duration-200"
            title="Quick View"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Discount Badge if available */}
        {discount && (
          <span className="absolute top-3 left-3 bg-[#FF3333]/10 text-[#FF3333] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#FF3333]/20">
            -{discount}%
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-1">
        <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-gray-700 transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Rating */}
        <StarRating rating={rating} />

        {/* Price & Discounts */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg sm:text-xl font-extrabold text-black">
            ${price}
          </span>
          {originalPrice && (
            <span className="text-base sm:text-lg font-bold text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
          {discount && (
            <span className="text-xs font-semibold text-[#FF3333] bg-[#FF3333]/10 px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
