import ProductCard from './ProductCard.jsx';

const ProductRecommendations = ({ products = [], currentProductId, onSelectProduct, onAddToCart }) => {
  const recommendations = products.filter((product) => String(product.id) !== String(currentProductId)).slice(0, 4);
  if (!recommendations.length) return null;

  return (
    <section className="mx-auto mt-[70px] w-full max-w-[1440px] px-[40px] max-[639px]:mt-[30px] max-[639px]:px-0">
      <h2 className="mb-[45px] text-center text-[32px] font-extrabold text-[#111] max-[639px]:mb-[18px] max-[639px]:text-[20px] max-[639px]:leading-[1]">
        YOU MIGHT ALSO LIKE
      </h2>
      <div className="grid grid-cols-4 gap-[20px] max-[639px]:grid-cols-2 max-[639px]:gap-[10px]">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

export default ProductRecommendations;
