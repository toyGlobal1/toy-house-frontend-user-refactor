import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BRAND_KEY } from "../../constants/query-key";
import { getAllBrands } from "../../service/brand.service";

export function TopBrands() {
  const { data } = useSuspenseQuery({ queryKey: [BRAND_KEY], queryFn: getAllBrands });
  const brands = data?.brands || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const swiperRef = useRef(null);

  return (
    <div className="relative mx-auto w-5/6 space-y-5 sm:space-y-7 md:space-y-9 lg:w-11/12">
      <h2 className="font-poppins text-center text-lg font-bold md:text-xl lg:text-4xl">
        Our Top Brands
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
            1920: { slidesPerView: 7, spaceBetween: 20 }, // For 1080p and higher
            1280: { slidesPerView: 6, spaceBetween: 18 }, // Large desktops
            1024: { slidesPerView: 5, spaceBetween: 15 }, // Laptops (720p & 1080p)
            768: { slidesPerView: 4, spaceBetween: 12 }, // Tablets
            500: { slidesPerView: 3, spaceBetween: 10 }, // Small screens
          }}
          modules={[Navigation]}
          className="mySwiper">
          {brands?.map((brand) => (
            <SwiperSlide key={brand.brand_id}>
              <div key={brand.brand_id}>
                <Link to={`/brandDetail/${brand.brand_id}`} className="block">
                  <div className="group flex flex-col items-center justify-center rounded-full bg-transparent">
                    <img
                      src={brand.brand_logo_url || ""}
                      alt={`${brand.name || "Brand"} Logo`}
                      className="h-16 w-16 rounded-full object-cover transition-transform group-hover:scale-110 sm:h-24 sm:w-24 md:h-32 md:w-32"
                      loading="lazy"
                    />
                    <h3 className="font-roboto mt-2 text-center font-bold">{brand.name}</h3>
                  </div>
                </Link>
              </div>
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
