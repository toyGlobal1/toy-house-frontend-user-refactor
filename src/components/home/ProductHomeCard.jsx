export function ProductHomeCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-200 dark:bg-white dark:text-black">
      {/* Product Image */}
      <div className="xs:h-[120px] h-[90px] w-full overflow-hidden rounded-t-lg sm:h-[150px] md:h-[170px] lg:h-[200px] xl:h-[220px]">
        <img
          src={product.display_image_url}
          alt={product?.product_name}
          loading="lazy"
          className="h-full w-full rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-[8px] p-2 sm:p-3 md:p-4">
        <div className="space-y-[1px]">
          <p className="xs:text-[11px] font-roboto truncate text-[10px] font-light sm:text-xs">
            {product?.brand_name || " "}
          </p>

          <h3 className="xs:text-sm font-poppins truncate text-[12px] font-semibold sm:text-base lg:text-lg">
            {product?.product_name || "No Name Available"}
          </h3>
        </div>

        <p className="xs:text-[11px] font-roboto text-[10px] font-medium sm:text-sm md:text-base">
          BDT {product?.selling_price}
        </p>
      </div>
    </div>
  );
}
