import { useDisclosure } from "@heroui/react";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router";
import { ShoppingCartDrawer } from "../components/cart/ShoppingCartDrawer";
import { Logo } from "../components/Logo";
import { useAuth } from "../hooks/useAuth";
import { HeaderNavDrawer } from "./HeaderNavDrawer";
import { HeaderNavigationMenu } from "./HeaderNavigationMenu";

export function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FEF987]">
        <div className="container flex items-center justify-between">
          <HeaderNavDrawer />
          <Link to="/">
            <Logo />
          </Link>
          <HeaderNavigationMenu />
          <div className="flex items-center gap-5">
            <FaMagnifyingGlass className="size-4" />
            <button onClick={onOpen}>
              <FaCartShopping className="size-4" />
            </button>
            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center gap-2">
                {/* Using FaUserCircle icon for user profile */}
                <FaUserCircle className="size-5" /> Profile
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </header>
      <ShoppingCartDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
