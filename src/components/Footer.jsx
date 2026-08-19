import React, { useState } from 'react';
import { Mail, Check, Twitter, Facebook, Instagram, Github } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-[#F0F0F0] mt-32 pt-28 sm:pt-36 pb-12">
      
      {/* Floating Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute -top-24 sm:-top-28 left-0 right-0 z-20">
        <div className="bg-black text-white rounded-3xl px-6 py-8 sm:px-12 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="lg:max-w-md xl:max-w-lg">
            <h2 className="font-integral text-2xl sm:text-3xl xl:text-4xl font-extrabold uppercase leading-tight">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h2>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[360px] xl:min-w-[400px]">
            {isSubscribed ? (
              <div className="bg-white/15 border border-white/30 text-white px-6 py-4 rounded-full flex items-center justify-center gap-2 text-sm font-medium animate-in fade-in duration-300">
                <Check size={18} className="text-green-400" />
                <span>Thank you! You have been subscribed for 20% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white text-black placeholder-gray-400 pl-12 pr-4 py-3.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    id="newsletter-email-input"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black font-semibold text-sm py-3.5 px-6 rounded-full hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
                  id="newsletter-subscribe-btn"
                >
                  Subscribe to Newsletter
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-200">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-6 lg:col-span-4 pr-0 lg:pr-8">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="font-integral text-2xl sm:text-3xl font-black tracking-tighter text-black mb-4 inline-block hover:opacity-85"
            >
              SHOP.CO
            </button>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 bg-white hover:bg-black text-black hover:text-white border border-gray-200 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={15} className="fill-white" />
              </a>
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 bg-white hover:bg-black text-black hover:text-white border border-gray-200 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="#github"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 bg-white hover:bg-black text-black hover:text-white border border-gray-200 rounded-full flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
            </div>
          </div>

          {/* COMPANY */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">
              COMPANY
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <button onClick={() => onNavigate && onNavigate('home')} className="hover:text-black transition-colors">About</button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('category')} className="hover:text-black transition-colors">Features</button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('category')} className="hover:text-black transition-colors">Works</button>
              </li>
              <li>
                <a href="#careers" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">Career</a>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">
              HELP
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">Customer Support</a>
              </li>
              <li>
                <a href="#delivery" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">Delivery Details</a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">
              FAQ
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <button onClick={() => onNavigate && onNavigate('cart')} className="hover:text-black transition-colors">Account</button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('cart')} className="hover:text-black transition-colors">Manage Deliveries</button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('cart')} className="hover:text-black transition-colors">Orders</button>
              </li>
              <li>
                <button onClick={() => onNavigate && onNavigate('cart')} className="hover:text-black transition-colors">Payments</button>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">
              RESOURCES
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <a href="#ebooks" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">Free eBooks</a>
              </li>
              <li>
                <a href="#tutorial" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">Development Tutorial</a>
              </li>
              <li>
                <a href="#blog" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">How to - Blog</a>
              </li>
              <li>
                <a href="#youtube" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">Youtube Playlist</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Payment Providers */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>

          {/* Payment Icons */}
          <div className="flex items-center gap-2">
            {/* Visa */}
            <div className="bg-white border border-gray-200 rounded px-2.5 py-1 flex items-center justify-center shadow-2xs h-7">
              <span className="font-bold text-[#1434CB] italic tracking-tighter text-xs">VISA</span>
            </div>
            {/* MasterCard */}
            <div className="bg-white border border-gray-200 rounded px-2 py-1 flex items-center justify-center shadow-2xs h-7">
              <div className="flex items-center -space-x-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90"></div>
              </div>
            </div>
            {/* PayPal */}
            <div className="bg-white border border-gray-200 rounded px-2.5 py-1 flex items-center justify-center shadow-2xs h-7">
              <span className="font-bold text-[#003087] italic text-xs">Pay<span className="text-[#0079C1]">Pal</span></span>
            </div>
            {/* Apple Pay */}
            <div className="bg-white border border-gray-200 rounded px-2.5 py-1 flex items-center justify-center shadow-2xs h-7">
              <span className="font-semibold text-black text-xs flex items-center gap-0.5"> Pay</span>
            </div>
            {/* Google Pay */}
            <div className="bg-white border border-gray-200 rounded px-2.5 py-1 flex items-center justify-center shadow-2xs h-7">
              <span className="font-semibold text-gray-700 text-xs"><span className="text-[#4285F4]">G</span> Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
