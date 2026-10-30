import { useState } from 'react';

const Stars = ({ rating }) => (
  <div className="flex gap-1 text-[18px]">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={star <= Number(rating) ? 'text-[#ffc633]' : 'text-[#ffc633] opacity-35'}>★</span>
    ))}
  </div>
);

const Reviews = ({ product, reviews = [], loading, error, customer, onLoginRequired, onSubmitReview }) => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [showMore, setShowMore] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const displayedReviews = showMore ? reviews : reviews.slice(0, 4);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      await onSubmitReview({ rating: Number(rating), comment: comment.trim() });
      setComment('');
      setShowForm(false);
    } catch (submitFailure) {
      setSubmitError(submitFailure.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto px-[20px] pb-[60px] pt-[28px] box-border max-[639px]:px-0 max-[639px]:pb-[28px] max-[639px]:pt-[20px]">
      <div className="w-full flex justify-between overflow-hidden border-b border-[#e5e5e5] mb-[26px] max-[639px]:mb-[14px]">
        {['details', 'reviews', 'faq'].map((tab) => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`relative border-none bg-transparent py-[18px] px-[10px] font-medium text-[15px] cursor-pointer transition-colors max-[639px]:px-0 max-[639px]:py-[12px] max-[639px]:text-[10px] ${activeTab === tab ? 'text-[#111] font-bold after:content-[\'\'] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-[#111]' : 'text-[#777] hover:text-[#111]'}`}>
            {tab === 'details' ? 'Product Details' : tab === 'reviews' ? 'Rating & Reviews' : 'FAQs'}
          </button>
        ))}
      </div>

      {activeTab === 'details' && (
        <div className="max-w-[850px] mx-auto my-[35px]">
          <h2 className="text-[25px] font-bold mb-[18px] text-[#111]">Product Details</h2>
          <p className="text-[#666] text-[14px] leading-[1.7] mb-[12px]">{product.description || 'Product details are not available.'}</p>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          <div className="flex justify-between items-center mb-[22px] max-[639px]:mb-[12px]">
            <h2 className="m-0 text-[40px] font-black tracking-[-1.1px] text-[#111] max-[639px]:text-[14px] max-[639px]:tracking-0">
              All Reviews <span className="text-[#777] text-[22px] font-medium">({reviews.length})</span>
            </h2>
            <button type="button" onClick={() => customer ? setShowForm((visible) => !visible) : onLoginRequired()} className="h-[44px] px-[22px] rounded-full bg-[#111] border-none cursor-pointer text-white text-[14px] font-semibold transition-colors hover:bg-[#222] max-[639px]:h-[28px] max-[639px]:px-[12px] max-[639px]:text-[9px]">
              {showForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 rounded-[18px] border border-[#e7e7e7] p-5 space-y-3">
              <label className="block text-sm font-medium">Rating
                <select value={rating} onChange={(event) => setRating(event.target.value)} className="ml-3 rounded-lg border border-gray-200 px-3 py-2">
                  {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} / 5</option>)}
                </select>
              </label>
              <label className="block text-sm font-medium">Comment
                <textarea required maxLength={2000} value={comment} onChange={(event) => setComment(event.target.value)} className="mt-1 block w-full rounded-xl bg-[#F0F0F0] px-4 py-3 font-normal" rows={3} />
              </label>
              {(submitError || error) && <p role="alert" className="text-sm text-red-600">{submitError || error}</p>}
              <button disabled={submitting} className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{submitting ? 'Submitting…' : 'Submit review'}</button>
            </form>
          )}

          {loading ? <p className="text-sm text-gray-500">Loading reviews…</p> : error && !showForm ? <p role="alert" className="text-sm text-red-600">{error}</p> : (
            <div className="grid grid-cols-2 gap-[20px] mb-[30px] max-[639px]:grid-cols-1 max-[639px]:gap-[10px] max-[639px]:mb-[18px]">
              {displayedReviews.length === 0 ? <p className="col-span-full text-sm text-gray-500">No reviews yet.</p> : displayedReviews.map((review, index) => {
                const name = review.customerName ?? review.name ?? 'Customer';
                const text = review.comment ?? review.text ?? '';
                const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString() : '';
                return (
                  <article className="w-full border border-[#e7e7e7] rounded-[18px] p-[20px] bg-white max-[639px]:rounded-[10px] max-[639px]:p-[12px]" key={review._id ?? `${name}-${index}`}>
                    <Stars rating={review.rating} />
                    <div className="flex items-center gap-[8px] mt-[12px] mb-[18px]">
                      <span className="text-[18px] font-bold text-[#111] max-[639px]:text-[11px]">{name}</span>
                      <span className="flex justify-center items-center w-[18px] h-[18px] rounded-full bg-[#00b341] text-white text-[10px] font-bold">✓</span>
                    </div>
                    <p className="m-0 text-[#555] text-[15px] leading-[1.7] mb-[16px] max-[639px]:text-[9px] max-[639px]:leading-[1.45] max-[639px]:mb-[10px]">{text}</p>
                    {date && <p className="m-0 text-[#999] text-[12px] max-[639px]:text-[9px]">Posted on {date}</p>}
                  </article>
                );
              })}
            </div>
          )}
          {reviews.length > 4 && !showMore && <button className="block mx-auto mt-[30px] px-[28px] py-[13px] border border-[#d9d9d9] rounded-full bg-white text-[#111] text-[14px] font-semibold cursor-pointer transition-colors hover:bg-[#f5f5f5]" onClick={() => setShowMore(true)}>Load More Reviews</button>}
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="max-w-[900px] mx-auto my-[20px]">
          {['What sizes are available?', 'Is this product made from breathable fabric?', 'Can I return or exchange this product?', 'How long does delivery take?'].map((question) => (
            <div className="border-b border-[#e5e5e5]" key={question}>
              <button type="button" className="w-full border-none bg-transparent px-[5px] py-[22px] flex justify-between items-center text-left text-[15px] cursor-pointer">{question}<span className="text-[20px]">+</span></button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Reviews;
