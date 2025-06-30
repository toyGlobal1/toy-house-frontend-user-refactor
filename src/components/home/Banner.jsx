import Lottie from "lottie-react";
import { Link } from "react-router";
import video from "../../assets/banner/Toyhouse Landing lottie final.json";

export function Banner() {
  return (
    <div className="relative m-0 mx-auto flex w-11/12 flex-col items-center overflow-hidden max-sm:py-5 sm:flex-row">
      {/* Floating Decorations */}
      <div className="absolute left-10 top-7 h-14 w-14 rounded-full bg-[#FDD835] opacity-60 max-sm:hidden sm:left-10 sm:top-3 sm:h-20 sm:w-20 md:left-20 md:top-0 md:h-24 md:w-24 lg:h-32 lg:w-32"></div>
      <div className="absolute -bottom-10 left-16 h-6 w-6 rounded-full bg-[#4CAF50] opacity-60 max-lg:hidden sm:bottom-8 sm:left-1/2 sm:h-10 sm:w-10 md:bottom-0 md:left-1/3 md:h-16 md:w-16 lg:bottom-14 lg:h-24 lg:w-24"></div>

      {/* Content Section */}
      <div className="relative z-10 flex h-full flex-col justify-center gap-3 sm:w-1/2 sm:items-start sm:gap-10">
        <div className="text-center sm:text-left">
          <h1 className="banner-welcome font-bold drop-shadow-lg sm:text-2xl md:text-4xl lg:text-6xl dark:text-black">
            Welcome to
          </h1>
          <h1 className="banner-title font-extrabold text-[#317ff3] drop-shadow-lg sm:text-4xl md:text-5xl lg:text-7xl">
            Toy House!
          </h1>
          <p className="banner-text mt-2 font-semibold drop-shadow-sm sm:mt-4 sm:text-lg md:mt-6 md:text-2xl dark:text-black">
            Let’s Bring Joy to Every Little Heart!
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 sm:justify-start sm:gap-4">
          <Link to={"/products"}>
            <button className="banner-button cursor-pointer text-nowrap rounded-full bg-[#317ff3] px-[12px] py-1 font-semibold text-white shadow-lg transition-all hover:bg-[#31b2f3] sm:py-[6px] sm:text-base md:px-5 md:py-2 md:text-lg lg:px-6 lg:py-3">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      {/* Video Section */}
      <div className="h-full w-full sm:flex-1">
        <Lottie autoplay loop animationData={video} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
