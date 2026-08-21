import { useState } from "react";

const reviews = [
  {
    name: "Samantha D.",
    rating: 5,
    text: '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
    date: "Posted on August 14, 2023",
  },
  {
    name: "Alex M.",
    rating: 5,
    text: '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
    date: "Posted on August 15, 2023",
  },
  {
    name: "Ethan R.",
    rating: 4.5,
    text: '"This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
    date: "Posted on August 16, 2023",
  },
  {
    name: "Olivia P.",
    rating: 4,
    text: '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this shirt stand out."',
    date: "Posted on August 17, 2023",
  },
  {
    name: "Liam K.",
    rating: 4,
    text: "\"This shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.\"",
    date: "Posted on August 18, 2023",
  },
  {
    name: "Ava H.",
    rating: 4.5,
    text: "\"I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.\"",
    date: "Posted on August 19, 2023",
  },
];

const Stars = ({ rating }) => {
  return (
    <div className="flex gap-1 text-[18px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= Math.floor(rating)
              ? "text-[#ffc633]"
              : "text-[#ffc633] opacity-35"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Reviews = () => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [showMore, setShowMore] = useState(false);

  const displayedReviews = showMore
    ? [...reviews, ...reviews.slice(0, 3)]
    : reviews.slice(0, 3);

  return (
    <section className="w-full max-w-[1280px] mx-auto px-[20px] pb-[60px] pt-[28px] box-border max-[639px]:px-0 max-[639px]:pb-[28px] max-[639px]:pt-[20px]">
      <div className="w-full flex justify-between overflow-hidden border-b border-[#e5e5e5] mb-[26px] max-[639px]:mb-[14px]">
        <button
          type="button"
          className={`relative border-none bg-transparent py-[18px] px-[10px] font-medium text-[15px] cursor-pointer transition-colors max-[639px]:px-0 max-[639px]:py-[12px] max-[639px]:text-[10px] ${
            activeTab === "details"
              ? "text-[#111] font-bold"
              : "text-[#777] hover:text-[#111]"
          } ${activeTab === "details" ? "after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-[#111]" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Product Details
        </button>

        <button
          type="button"
          className={`relative border-none bg-transparent py-[18px] px-[10px] font-medium text-[15px] cursor-pointer transition-colors max-[639px]:px-0 max-[639px]:py-[12px] max-[639px]:text-[10px] ${
            activeTab === "reviews"
              ? "text-[#111] font-bold"
              : "text-[#777] hover:text-[#111]"
          } ${activeTab === "reviews" ? "after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-[#111]" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Rating &amp; Reviews
        </button>

        <button
          type="button"
          className={`relative border-none bg-transparent py-[18px] px-[10px] font-medium text-[15px] cursor-pointer transition-colors max-[639px]:px-0 max-[639px]:py-[12px] max-[639px]:text-[10px] ${
            activeTab === "faq"
              ? "text-[#111] font-bold"
              : "text-[#777] hover:text-[#111]"
          } ${activeTab === "faq" ? "after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-[#111]" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          FAQs
        </button>
      </div>

      {activeTab === "details" && (
        <div className="max-w-[850px] mx-auto my-[35px]">
          <h2 className="text-[25px] font-bold mb-[18px] text-[#111]">
            Product Details
          </h2>
          <p className="text-[#666] text-[14px] leading-[1.7] mb-[12px]">
            This graphic t-shirt is designed for everyday comfort and style.
            Crafted from soft and breathable fabric, it offers a comfortable fit
            while maintaining a modern look.
          </p>
          <p className="text-[#666] text-[14px] leading-[1.7] mb-[12px]">
            Perfect for casual occasions and easy to pair with jeans, shorts, or
            other everyday outfits.
          </p>
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          <div className="flex justify-between items-center mb-[22px] max-[639px]:mb-[12px]">
            <h2 className="m-0 text-[40px] font-black tracking-[-1.1px] text-[#111] max-[639px]:text-[14px] max-[639px]:tracking-0">
              All Reviews{" "}
              <span className="text-[#777] text-[22px] font-medium">(451)</span>
            </h2>

            <div className="flex items-center gap-[12px]">
              <button className="w-[44px] h-[44px] rounded-full bg-[#f3f3f3] border-none cursor-pointer text-[#111] text-[15px] transition-colors hover:bg-[#e8e8e8] max-[639px]:h-[26px] max-[639px]:w-[26px] max-[639px]:text-[10px]">
                <i className="fa-solid fa-sliders"></i>
              </button>

              <button className="hidden h-[44px] px-[18px] rounded-full bg-[#f3f3f3] border-none cursor-pointer text-[#111] text-[14px] items-center gap-[10px] transition-colors hover:bg-[#e8e8e8] sm:flex">
                Latest
                <i className="fa-solid fa-chevron-down text-[10px]"></i>
              </button>

              <button className="h-[44px] px-[22px] rounded-full bg-[#111] border-none cursor-pointer text-white text-[14px] font-semibold transition-colors hover:bg-[#222] max-[639px]:h-[28px] max-[639px]:px-[12px] max-[639px]:text-[9px]">
                Write a Review
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[20px] mb-[30px] max-[639px]:grid-cols-1 max-[639px]:gap-[10px] max-[639px]:mb-[18px]">
            {displayedReviews.map((review, index) => (
              <div
                className="w-full border border-[#e7e7e7] rounded-[18px] p-[20px] bg-white max-[639px]:rounded-[10px] max-[639px]:p-[12px]"
                key={index}
              >
                <div className="flex justify-between items-start mb-[12px]">
                  <div className="max-[639px]:scale-[0.78] max-[639px]:origin-left">
                    <Stars rating={review.rating} />
                  </div>
                  <button className="border-none bg-transparent text-[#999] text-[18px] cursor-pointer">
                    •••
                  </button>
                </div>

                <div className="flex items-center gap-[8px] mt-[12px] mb-[18px]">
                  <span className="text-[18px] font-bold text-[#111] max-[639px]:text-[11px]">
                    {review.name}
                  </span>
                  <span className="flex justify-center items-center w-[18px] h-[18px] rounded-full bg-[#00b341] text-white text-[10px] font-bold max-[639px]:h-[12px] max-[639px]:w-[12px] max-[639px]:text-[7px]">
                    ✓
                  </span>
                </div>

                <p className="m-0 text-[#555] text-[15px] leading-[1.7] mb-[16px] max-[639px]:text-[9px] max-[639px]:leading-[1.45] max-[639px]:mb-[10px]">
                  {review.text}
                </p>

                <p className="m-0 text-[#999] text-[12px] max-[639px]:text-[9px]">
                  {review.date}
                </p>
              </div>
            ))}
          </div>

          {!showMore && (
            <button
              className="block mx-auto mt-[30px] px-[28px] py-[13px] border border-[#d9d9d9] rounded-full bg-white text-[#111] text-[14px] font-semibold cursor-pointer transition-colors hover:bg-[#f5f5f5] max-[639px]:mt-[12px] max-[639px]:px-[20px] max-[639px]:py-[8px] max-[639px]:text-[9px]"
              onClick={() => setShowMore(true)}
            >
              Load More Reviews
            </button>
          )}
        </div>
      )}

      {activeTab === "faq" && (
        <div className="max-w-[900px] mx-auto my-[20px]">
          {[
            "What sizes are available?",
            "Is this product made from breathable fabric?",
            "Can I return or exchange this product?",
            "How long does delivery take?",
          ].map((question, idx) => (
            <div className="border-b border-[#e5e5e5]" key={idx}>
              <button className="w-full border-none bg-transparent px-[5px] py-[22px] flex justify-between items-center text-left text-[15px] cursor-pointer">
                {question}
                <span className="text-[20px]">+</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Reviews;
