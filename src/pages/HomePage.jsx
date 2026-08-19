import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import StarRating from "../components/StarRating.jsx";
import { PRODUCTS, REVIEWS } from "../data/products.js";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import hero from "../assets/Rectangle2.png";
import formal from "../assets/formal.png";
import party from "../assets/party.png";
import casual from "../assets/casual.png";
import gym from "../assets/gym.png";

export default function HomePage({ onNavigate, onSelectProduct, onAddToCart }) {
  const [reviewIndex, setReviewIndex] = useState(0);

  // New arrivals: products 10, 4, 5, 6
  const newArrivals = PRODUCTS.filter((p) =>
    ["prod-10", "prod-4", "prod-5", "prod-6"].includes(p.id),
  );

  // Top selling: products 7, 8, 9, 11
  const topSelling = PRODUCTS.filter((p) =>
    ["prod-7", "prod-8", "prod-9", "prod-11"].includes(p.id),
  );

  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="bg-[#F2F0F1] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 pb-10 lg:pb-16 z-10">
              <h1 className="font-integral text-4xl sm:text-5xl xl:text-[62px] font-black uppercase text-black leading-[1.05] tracking-tight mb-5">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>

              <button
                onClick={() => onNavigate("category")}
                className="w-full sm:w-auto bg-black text-white px-14 py-4 rounded-full font-semibold text-base hover:bg-gray-800 transition-all shadow-md cursor-pointer mb-10"
                id="hero-shop-now-btn"
              >
                Shop Now
              </button>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 border-t border-gray-300/60 sm:border-none">
                <div className="border-r border-gray-300/80 pr-2 sm:pr-4">
                  <span className="block font-integral text-2xl sm:text-4xl font-extrabold text-black">
                    200+
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 font-normal">
                    International Brands
                  </span>
                </div>

                <div className="border-r border-gray-300/80 px-2 sm:px-4">
                  <span className="block font-integral text-2xl sm:text-4xl font-extrabold text-black">
                    2,000+
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 font-normal">
                    High-Quality Products
                  </span>
                </div>

                <div className="pl-2 sm:pl-4">
                  <span className="block font-integral text-2xl sm:text-4xl font-extrabold text-black">
                    30,000+
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 font-normal">
                    Happy Customers
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative flex justify-center items-end self-end">
              {/* Star Vector Icons */}
              {/* Small star on left */}
              <div className="absolute left-2 sm:left-6 top-28 sm:top-36 z-20 text-black animate-pulse">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 56 56"
                  fill="currentColor"
                >
                  <path d="M28 0C28 15.464 15.464 28 0 28C15.464 28 28 40.536 28 56C28 40.536 40.536 28 56 28C40.536 28 28 15.464 28 0Z" />
                </svg>
              </div>

              {/* Big star on top right */}
              <div className="absolute right-4 sm:right-10 top-6 sm:top-10 z-20 text-black">
                <svg
                  width="84"
                  height="84"
                  viewBox="0 0 56 56"
                  fill="currentColor"
                >
                  <path d="M28 0C28 15.464 15.464 28 0 28C15.464 28 28 40.536 28 56C28 40.536 40.536 28 56 28C40.536 28 28 15.464 28 0Z" />
                </svg>
              </div>

              {/* Model Cutout Image */}
              <div className="relative w-full max-w-md lg:max-w-none pt-6 flex justify-center">
                <img
                  src={hero}
                  alt="Fashion models styled in SHOP.CO apparel"
                  className="w-full h-auto max-h-145 object-cover object-top drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRANDS BAR */}
      <section id="brands-section" className="bg-black py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-10 text-white">
            {/* VERSACE */}
            <div className="flex-1 min-w-30 flex justify-center">
              <span className="font-sans tracking-[0.25em] text-xl sm:text-3xl font-extrabold uppercase">
                VERSACE
              </span>
            </div>

            {/* ZARA */}
            <div className="flex-1 min-w-25 flex justify-center">
              <span className="font-sans tracking-tight text-2xl sm:text-4xl font-extrabold uppercase">
                ZARA
              </span>
            </div>

            {/* GUCCI */}
            <div className="flex-1 min-w-27.5 flex justify-center">
              <span className="font-sans tracking-[0.2em] text-xl sm:text-3xl font-bold uppercase">
                GUCCI
              </span>
            </div>

            {/* PRADA */}
            <div className="flex-1 min-w-27.5 flex justify-center">
              <span className="font-sans tracking-[0.15em] text-xl sm:text-3xl font-black uppercase">
                PRADA
              </span>
            </div>

            {/* Calvin Klein */}
            <div className="flex-1 min-w-35 flex justify-center">
              <span className="font-sans font-light tracking-wide text-lg sm:text-2xl">
                Calvin Klein
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-integral text-3xl sm:text-4xl md:text-5xl font-black text-center uppercase mb-12 sm:mb-14">
            NEW ARRIVALS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate("category", { filter: "new-arrivals" })}
              className="border border-gray-200 hover:border-black text-black px-14 py-3.5 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-all cursor-pointer"
              id="btn-view-all-new-arrivals"
            >
              View All
            </button>
          </div>

          <div className="border-b border-gray-200 mt-16"></div>
        </div>
      </section>

      {/* 4. TOP SELLING */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-integral text-3xl sm:text-4xl md:text-5xl font-black text-center uppercase mb-12 sm:mb-14">
            TOP SELLING
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {topSelling.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate("category", { filter: "top-selling" })}
              className="border border-gray-200 hover:border-black text-black px-14 py-3.5 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-all cursor-pointer"
              id="btn-view-all-top-selling"
            >
              View All
            </button>
          </div>
        </div>
      </section>

      {/* 5. BROWSE BY DRESS STYLE */}
      <section className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F0F0F0] rounded-3xl p-6 sm:p-12 lg:p-16">
            <h2 className="font-integral text-2xl sm:text-4xl md:text-5xl font-black text-center uppercase mb-8 sm:mb-12">
              BROWSE BY DRESS STYLE
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
              {/* Casual Card (1/3) */}
              <div
                onClick={() => onNavigate("category", { dressStyle: "casual" })}
                className="md:col-span-4 bg-white rounded-2xl overflow-hidden relative h-56 sm:h-72 cursor-pointer group shadow-xs hover:shadow-md transition-all"
                id="style-card-casual"
              >
                <span className="font-integral text-2xl sm:text-3xl font-bold text-black absolute top-6 left-6 z-10">
                  Casual
                </span>
                <img
                  src={casual}
                  alt="Casual style"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Formal Card (2/3) */}
              <div
                onClick={() => onNavigate("category", { dressStyle: "formal" })}
                className="md:col-span-8 bg-white rounded-2xl overflow-hidden relative h-56 sm:h-72 cursor-pointer group shadow-xs hover:shadow-md transition-all"
                id="style-card-formal"
              >
                <span className="font-integral text-2xl sm:text-3xl font-bold text-black absolute top-6 left-6 z-10">
                  Formal
                </span>
                <img
                  src={formal}
                  alt="Formal style"
                  className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Party Card (2/3) */}
              <div
                onClick={() => onNavigate("category", { dressStyle: "party" })}
                className="md:col-span-8 bg-white rounded-2xl overflow-hidden relative h-56 sm:h-72 cursor-pointer group shadow-xs hover:shadow-md transition-all"
                id="style-card-party"
              >
                <span className="font-integral text-2xl sm:text-3xl font-bold text-black absolute top-6 left-6 z-10">
                  Party
                </span>
                <img
                  src={party}
                  alt="Party style"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Gym Card (1/3) */}
              <div
                onClick={() => onNavigate("category", { dressStyle: "gym" })}
                className="md:col-span-4 bg-white rounded-2xl overflow-hidden relative h-56 sm:h-72 cursor-pointer group shadow-xs hover:shadow-md transition-all"
                id="style-card-gym"
              >
                <span className="font-integral text-2xl sm:text-3xl font-bold text-black absolute top-6 left-6 z-10">
                  Gym
                </span>
                <img
                  src={gym}
                  alt="Gym style"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR HAPPY CUSTOMERS */}
      <section className="py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h2 className="font-integral text-2xl sm:text-4xl md:text-5xl font-black uppercase">
              OUR HAPPY CUSTOMERS
            </h2>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Reviews Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const item = REVIEWS[(reviewIndex + offset) % REVIEWS.length];
              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Stars */}
                    <div className="mb-3">
                      <StarRating rating={item.rating} showScore={false} />
                    </div>

                    {/* Customer Name & Verified badge */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <h4 className="text-base font-bold text-black">
                        {item.name}
                      </h4>
                      <CheckCircle2
                        size={16}
                        className="fill-green-600 text-white"
                      />
                    </div>

                    {/* Feedback text */}
                    <p className="text-gray-500 text-sm leading-relaxed">
                      "{item.text}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
