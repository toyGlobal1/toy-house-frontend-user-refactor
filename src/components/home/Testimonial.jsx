import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getTopReviews } from "../../service/review.service";

export function Testimonial() {
  const { data } = useSuspenseQuery({ queryKey: ["topReviews"], queryFn: getTopReviews });
  const reviews = data?.reviews || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const swiperRef = useRef(null);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-8 overflow-hidden bg-[#31b2f3] bg-no-repeat px-6 py-10 sm:space-y-8 md:py-14 lg:flex-row lg:space-x-5 lg:py-20">
      {/* Text Section - 40% Width */}
      <div className="flex w-full items-center justify-center text-center lg:mb-0 lg:w-2/5 lg:text-left">
        <div className="mx-auto w-11/12">
          <h1 className="font-poppins text-lg font-bold text-white sm:text-2xl md:text-4xl lg:text-4xl">
            Listen to Our Customers
          </h1>
          <p className="mt-1 text-xs text-white sm:mt-2 sm:text-base lg:mt-4">
            Our customers love our toys! Read their reviews to see why they keep coming back.
          </p>
        </div>
      </div>
      <div className="relative mx-auto w-full sm:w-4/5 md:w-11/12 lg:w-3/5">
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
            1920: { slidesPerView: 2, spaceBetween: 20 }, // For 1080p and higher
            1280: { slidesPerView: 2, spaceBetween: 18 }, // Large desktops
            1024: { slidesPerView: 2, spaceBetween: 15 }, // Laptops (720p & 1080p)
            768: { slidesPerView: 2, spaceBetween: 12 }, // Tablets
            500: { slidesPerView: 2, spaceBetween: 10 }, // Small screens
          }}
          modules={[Navigation]}
          className="mySwiper">
          {reviews?.map((review) => (
            <SwiperSlide key={review.id}>
              <div key={review.id}>
                <div className="flex h-[120px] w-[130px] flex-col justify-between space-y-2 rounded-md bg-white p-3 shadow-lg sm:h-[180px] sm:w-[180px] sm:p-3 md:h-[200px] md:w-[300px] md:space-y-4 md:rounded-2xl md:p-4 lg:h-[250px] lg:w-[300px] dark:bg-white">
                  <div className="dark:text-black">
                    <h2 className="font-poppins text-xs sm:text-sm md:text-lg lg:text-xl">
                      {review.reviewer_name || "Anonymous"}
                    </h2>
                    <div className="-mt-1 mb-5 flex space-x-[2px]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-xs sm:text-sm lg:text-lg ${
                            review.rating >= star ? "text-yellow-500" : "text-gray-400"
                          }`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="font-roboto text-xs sm:text-sm lg:text-sm">
                      {review.comment || "No feedback provided."}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

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
  );
}
