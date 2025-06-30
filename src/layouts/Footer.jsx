import { Button, Input } from "@heroui/react";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutube } from "react-icons/tb";
import { Link } from "react-router";
import { Logo } from "../components/Logo";

export function Footer() {
  return (
    <footer className="relative space-y-8 bg-[#FFFCB7] pt-10 max-sm:w-full sm:pt-20 dark:text-black">
      <div className="mx-auto flex w-11/12 flex-row flex-wrap justify-center gap-2 space-y-10 sm:gap-6 sm:space-y-0 md:w-4/5 lg:gap-10">
        <div className="mx-auto flex w-full flex-col items-center space-x-[5px] sm:w-1/2 sm:space-y-3 lg:items-start">
          <Logo className="size-[100px]" />
          <p className="font-roboto text-center text-base font-normal lg:pr-28 lg:text-left">
            By subscribing you agree to our Privacy Policy and consent to receive updates from our
            company.
          </p>
        </div>
        <div className="flex flex-col space-y-3 max-sm:items-center sm:flex-1">
          <h1 className="font-roboto text-sm font-semibold md:text-base lg:text-lg">Follow Us</h1>
          <div className="flex flex-wrap items-center gap-8">
            <Link>
              <AiOutlineFacebook className="font-roboto text-3xl font-light" />
            </Link>
            <Link>
              <AiOutlineInstagram className="font-roboto text-3xl font-light" />
            </Link>
            <Link>
              <FaXTwitter className="font-roboto text-[26px] font-light" />{" "}
            </Link>
            <Link>
              <AiOutlineLinkedin className="font-roboto text-3xl font-light" />
            </Link>
            <Link>
              <TbBrandYoutube className="font-roboto text-3xl font-light" />
            </Link>
          </div>
          <div className="space-y-3">
            <p className="font-roboto text-center text-base font-normal text-black lg:text-left">
              Join our newsletter to stay up to date on features and releases.
            </p>
            <div className="flex items-center gap-2">
              <Input
                variant="bordered"
                radius="none"
                placeholder="Enter your email"
                classNames={{ inputWrapper: "border-black" }}
              />
              <Button variant="bordered" radius="none" className="border-black">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-4/5 flex-col items-center justify-between border-t-2 border-solid border-black pb-10 pt-5 sm:flex-row">
        <h1 className="font-roboto text-sm">© 2024 Toy House. All rights reserved.</h1>
        <div className="flex items-center justify-center gap-3 max-sm:mt-5 max-sm:flex-col sm:gap-5">
          <Link to="/privacyPolicy">
            <h1 className="font-roboto text-sm">Privacy Policy</h1>
          </Link>
          <h1 className="font-roboto text-sm">Terms of Service</h1>
          <h1 className="font-roboto text-sm">Cookies Settings</h1>
        </div>
      </div>
    </footer>
  );
}
