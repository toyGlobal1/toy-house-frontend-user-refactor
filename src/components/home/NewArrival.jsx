import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllNewProducts } from "../../service/product.service";
import { ProductHomeCard } from "./ProductHomeCard";

export function NewArrival() {
  const { data } = useSuspenseQuery({
    queryKey: ["newProducts"],
    queryFn: getAllNewProducts,
  });
  const newProducts = data?.new_products || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const swiperRef = useRef(null);

  if (!newProducts || newProducts.length === 0) {
    return (
      <h1 className="font-roboto text-center text-lg font-normal">
        No new arrivals at the moment.
      </h1>
    );
  }

  return (
    <div className="w-full space-y-8 bg-[#f5f5f5] py-10 sm:space-y-10 sm:py-14 md:space-y-14 md:py-20 dark:bg-[#f5f5f5]">
      <h2 className="font-poppins mb-10 text-center text-xl font-bold md:text-2xl lg:text-4xl">
        New Arrivals
      </h2>

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
          {newProducts?.map((item) => (
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
            className="custom-prev absolute -left-[30px] top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#FEF987] p-1 shadow-md transition sm:-left-[38px] sm:p-1 md:-left-[43px] md:p-2 lg:-left-[50px] lg:p-3"
            aria-label="Previous Slide"
            onClick={() => swiperRef.current.swiper.slidePrev()}>
            <LuChevronLeft className="size-4 sm:size-5" />
          </button>
        )}

        {/* Right Button - Hide if last slide is fully visible */}
        {currentIndex < totalSlides - slidesPerView && (
          <button
            className="custom-next absolute -right-[30px] top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#FEF987] p-1 shadow-md transition sm:-right-[38px] sm:p-1 md:-right-[43px] md:p-2 lg:-right-[50px] lg:p-3"
            aria-label="Next Slide"
            onClick={() => swiperRef.current.swiper.slideNext()}>
            <LuChevronRight className="size-4 sm:size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
