import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TopBanner({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      id="top-announcement-banner"
      className="bg-black text-white text-xs sm:text-sm py-2 px-4 relative z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        <p className="text-center font-normal tracking-wide">
          Sign up and get 20% off to your first order.{' '}
          <button
            onClick={() => onNavigate && onNavigate('category', { filter: 'on-sale' })}
            className="font-semibold underline underline-offset-2 hover:text-gray-200 transition-colors ml-1 inline-block cursor-pointer"
          >
            Sign Up Now
          </button>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 transition-colors"
          aria-label="Close notification"
          id="btn-close-banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
