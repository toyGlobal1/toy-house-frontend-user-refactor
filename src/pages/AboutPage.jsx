import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

export default function AboutPage() {
  return (
    <div className="mx-auto w-11/12 px-6 py-12 md:w-4/5 dark:bg-white dark:text-black">
      <h1 className="font-poppins mb-3 text-left text-xl font-bold sm:mb-4 md:mb-6 md:text-2xl lg:text-3xl">
        About Us
      </h1>
      <p className="font-roboto text-left text-sm leading-relaxed sm:text-base md:text-lg">
        <strong className="font-poppins">Toy House</strong> is a service-oriented e-commerce
        business dedicated to bringing you the best quality baby toys and products with world-class
        customer support. Our mission is to make shopping for children's toys easy, convenient, and
        enjoyable from the comfort of your home.
      </p>

      <p className="font-roboto mt-4 text-left text-sm leading-relaxed sm:text-base md:text-lg">
        At Toy House, we utilize the power of the internet to provide a seamless shopping
        experience, ensuring that busy parents and guardians can find the perfect toys for their
        little ones without any hassle. We currently deliver across Bangladesh, and customers
        outside Bangladesh can also place orders with a valid Bangladeshi shipping address.
      </p>

      <p className="font-roboto mt-4 text-left text-sm leading-relaxed sm:text-base md:text-lg">
        Enjoy a smooth and secure shopping experience with Toy House, where quality and customer
        satisfaction come first.
      </p>

      <div className="mt-8 border-t pt-6">
        <h2 className="font-poppins mb-4 text-left text-2xl font-semibold">Contact Us</h2>
        <div className="font-roboto flex flex-col items-start gap-4">
          <p className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
            <FaPhone /> <span>01626809609</span>
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
            <FaEnvelope /> <span>kuswarkhan2018@gmail.com</span>
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
            <FaMapMarkerAlt /> <span>Toy House, Level-1, A1, 37C</span>
          </p>
        </div>
      </div>
    </div>
  );
}
