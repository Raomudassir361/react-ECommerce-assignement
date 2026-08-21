import cloth9 from "../assets/cloth9.png";
import cloth10 from "../assets/cloth10.png";
import cloth11 from "../assets/cloth11.png";
import cloth12 from "../assets/cloth12.png";
import ProductCard from "./ProductCard.jsx";

const recommendedProducts = [
  {
    id: 1,
    name: "Polo with Contrast Trims",
    price: 242,
    originalPrice: 260,
    discount: 20,
    rating: 4.0,
    image: cloth10,
  },
  {
    id: 2,
    name: "Gradient Graphic T-shirt",
    price: 145,
    rating: 3.5,
    image: cloth9,
  },
  {
    id: 3,
    name: "Polo with Tipping Details",
    price: 180,
    rating: 4.5,
    image: cloth11,
  },
  {
    id: 4,
    name: "Black Striped T-shirt",
    price: 150,
    originalPrice: 180,
    discount: 30,
    rating: 5.0,
    image: cloth12,
  },
];

const ProductRecommendations = ({ onSelectProduct, onAddToCart }) => {
  return (
    <section className="mx-auto mt-[70px] w-full max-w-[1440px] px-[40px] max-[639px]:mt-[30px] max-[639px]:px-0">
      <h2 className="mb-[45px] text-center text-[32px] font-extrabold text-[#111] max-[639px]:mb-[18px] max-[639px]:text-[20px] max-[639px]:leading-[1]">
        YOU MIGHT ALSO LIKE
      </h2>

      <div className="grid grid-cols-4 gap-[20px] max-[639px]:grid-cols-2 max-[639px]:gap-[10px]">
        {recommendedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};
export default ProductRecommendations;
