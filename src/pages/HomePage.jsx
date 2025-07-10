import { Suspense } from "react";
import { Banner } from "../components/home/Banner";
import { FeaturedCollection } from "../components/home/FeaturedCollection";
import { NewArrival } from "../components/home/NewArrival";
import { ShopByAge } from "../components/home/ShopByAge";
import { Support } from "../components/home/Support";
import { Testimonial } from "../components/home/Testimonial";
import { TopCategories } from "../components/home/TopCategories";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <div className="relative z-20 space-y-12 pb-20 text-[#3E3E3E] md:space-y-16 lg:space-y-20">
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedCollection />
        </Suspense>
        <ShopByAge />
        <Support />
        {/* <Suspense fallback={<div>Loading...</div>}>
          <TopBrands />
        </Suspense> */}
        <Suspense fallback={<div>Loading...</div>}>
          <NewArrival />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TopCategories />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Testimonial />
      </Suspense>
    </div>
  );
}
