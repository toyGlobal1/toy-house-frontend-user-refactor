import { FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router";
import { Logo } from "../components/Logo";
import { HeaderNavigationMenu } from "./HeaderNavigationMenu";

export function Header() {
  return (
    <header className="bg-[#FEF987]">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <HeaderNavigationMenu />
        <div className="flex items-center gap-5">
          <FaMagnifyingGlass className="size-4" />
          <FaCartShopping className="size-4" />
          <Link to="/login">Login</Link>
        </div>
      </div>
    </header>
  );
}
