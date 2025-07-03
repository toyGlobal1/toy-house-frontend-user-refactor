import { Link } from "react-router";

export function ProductCard({ product }) {
  return (
    <div className="product-cart group flex w-full flex-col overflow-hidden rounded-md border border-gray-200 shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-200 dark:bg-white dark:text-black">
      <img
        src={product?.display_image_url}
        alt={product?.product_name}
        className="h-[130px] w-full transition-transform duration-300 group-hover:scale-105 sm:h-[220px] md:h-[200px] lg:h-[250px]"
      />
      <div className="flex flex-col space-y-1 px-2 pb-3 sm:space-y-2 md:space-y-3 lg:px-3">
        <div className="flex flex-col justify-between space-y-[2px] pt-2 md:pt-4 lg:pt-5">
          <p className="font-roboto text-[10px] sm:text-[12px] md:text-[13px]">
            {product?.brand_name || " "}
          </p>
          <h2 className="font-poppins line-clamp-1 pr-2 text-[12px] font-bold sm:text-sm md:text-[16px] lg:text-[19px]">
            {product?.product_name || "Product Name"}
          </h2>
        </div>
        <p className="font-roboto text-[10px] sm:text-[12px] md:text-[13px]">
          {product?.category_name || " "}
        </p>
        <div className="mt-2 flex items-center justify-between space-x-1 lg:space-x-2">
          <Link to={`/products/${product.id}`} className="lg:w-1/2">
            <button className="cursor-pointer text-nowrap rounded-[8px] bg-[#317ff3] px-[6px] py-1 text-[9px] font-semibold text-white transition-all hover:bg-[#31b2f3] sm:py-[6px] sm:text-xs md:px-2 lg:py-2 lg:text-sm">
              View Details
            </button>
          </Link>
          <div className="max-sm:mt-[4px]">
            <p className="text-nowrap text-[9px] font-bold text-[#3E3E3E] sm:text-xs lg:text-base">
              BDT {product?.selling_price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
