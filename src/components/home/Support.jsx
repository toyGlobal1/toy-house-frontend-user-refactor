import { BadgeIcon } from "../icons/BadgeIcon";
import { CollectionIcon } from "../icons/CollectionIcon";
import { TruckIcon } from "../icons/TruckIcon";

export function Support() {
  return (
    <div className="mx-auto w-11/12 rounded-3xl bg-[#FDFEC1] p-8 sm:py-5 md:rounded-full md:py-10 lg:py-16">
      <div className="mx-auto flex w-11/12 flex-col items-center justify-between max-sm:space-y-8 sm:flex-row sm:space-x-5">
        {/* Left Section */}
        <div className="w-full text-center sm:w-2/5 sm:text-left">
          <h1 className="font-poppins text-2xl font-extrabold leading-relaxed sm:text-2xl sm:leading-loose md:leading-normal lg:text-4xl lg:leading-[55px]">
            Shopping at <br className="my-2" /> ToyHouse <br className="my-2" /> Has its Perks
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 flex-row items-center justify-evenly space-x-5">
          <div className="flex flex-col items-center space-y-4 text-center sm:items-start sm:text-left">
            <div className="md:mb-6 md:h-10 md:w-10 lg:mb-0 lg:h-full lg:w-full">
              <BadgeIcon />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h1 className="font-roboto text-xs font-bold text-[#2F3132] md:text-base">
                Best Price Guarantee
              </h1>
              <h1 className="font-roboto text-xs text-[#2F3132] max-sm:hidden md:text-base">
                Toyhouse offers the lowest prices
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center sm:items-start sm:text-left">
            <div className="md:mb-6 md:h-10 md:w-10 lg:mb-0 lg:h-full lg:w-full">
              <CollectionIcon />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h1 className="font-roboto text-xs font-bold text-[#2F3132] md:text-base">
                largest Collection
              </h1>
              <h1 className="font-roboto text-xs text-[#2F3132] max-sm:hidden md:text-base">
                Toyhouse has the largest Collection
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center pt-3 text-center sm:items-start sm:text-left">
            <div className="md:mb-6 md:h-10 md:w-10 lg:mb-0 lg:h-full lg:w-full">
              <TruckIcon />
            </div>
            <div className="mt-[24px] flex flex-col items-center sm:items-start">
              <h1 className="font-roboto text-xs font-bold text-[#2F3132] md:text-base">
                Fastest Delivery
              </h1>
              <h1 className="font-roboto mt-[2px] text-xs text-[#2F3132] max-sm:hidden md:text-base">
                Uses the fastest delivery system in town
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
