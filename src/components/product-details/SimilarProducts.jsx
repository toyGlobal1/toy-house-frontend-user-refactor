import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllProductsByCategory } from "../../service/product.service";
import { ProductHomeCard } from "../home/ProductHomeCard";

export function SimilarProducts({ productId, categoryId }) {
  const { data, isFetching } = useQuery({
    queryKey: ["categoryProducts", categoryId],
    queryFn: () => getAllProductsByCategory(categoryId),
  });

  const products = data?.category_products || [];

  const similarProducts = products.filter((item) => item.id !== productId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      setTotalSlides(swiperInstance.slides.length);
      setSlidesPerView(swiperInstance.params.slidesPerView);
    }
  }, []);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="mb-10 text-xl font-bold md:text-2xl dark:text-black">You May Also Like</h2>

      <div className="relative mx-auto w-5/6 lg:w-11/12">
        <Swiper
          ref={swiperRef}
          slidesPerView={slidesPerView}
          spaceBetween={15}
          onSwiper={(swiper) => {
            setTotalSlides(swiper.slides.length);
            setSlidesPerView(swiper.params.slidesPerView);
          }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          breakpoints={{
            1920: { slidesPerView: 6, spaceBetween: 20 }, // For 1080p and higher
            1280: { slidesPerView: 5, spaceBetween: 18 }, // Large desktops
            1024: { slidesPerView: 4, spaceBetween: 15 }, // Laptops (720p & 1080p)
            768: { slidesPerView: 3, spaceBetween: 12 }, // Tablets
            500: { slidesPerView: 2, spaceBetween: 10 }, // Small screens
          }}
          modules={[Navigation]}
          className="mySwiper">
          {similarProducts?.map((item) => (
            <SwiperSlide key={item.id} className="mb-2 rounded-lg shadow">
              <Link to={`/products/${item.id}`}>
                <ProductHomeCard product={item} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left Button - Show only if not on the first slide */}
        {currentIndex > 0 && (
          <button
            className="custom-prev absolute -left-[30px] top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#FEF987] p-1 shadow-md transition max-sm:-mt-3 sm:-left-[38px] sm:p-1 md:-left-[43px] md:p-[6px] lg:-left-[50px] lg:p-2"
            aria-label="Previous Slide"
            onClick={() => swiperRef.current.swiper.slidePrev()}>
            <LuChevronLeft className="size-4 sm:size-5" />
          </button>
        )}

        {/* Right Button - Hide if last slide is fully visible */}
        {currentIndex < totalSlides - slidesPerView && (
          <button
            className="custom-next absolute -right-[30px] top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#FEF987] p-1 shadow-md transition max-sm:-mt-3 sm:-right-[38px] sm:p-1 md:-right-[43px] md:p-[6px] lg:-right-[50px] lg:p-2"
            aria-label="Next Slide"
            onClick={() => swiperRef.current.swiper.slideNext()}>
            <LuChevronRight className="size-4 sm:size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
