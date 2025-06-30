import { useSuspenseQueries } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import { BRAND_KEY, CATEGORY_KEY } from "../constants/query-key";
import { getAllBrands } from "../service/brand.service";
import { getAllCategories } from "../service/category.service";

export function HeaderNavigationMenu() {
  const [{ data: categoryData }, { data: brandData }] = useSuspenseQueries({
    queries: [
      { queryKey: [CATEGORY_KEY], queryFn: getAllCategories },
      { queryKey: [BRAND_KEY], queryFn: getAllBrands },
    ],
  });

  const categories = categoryData?.categories;
  const brands = brandData?.brands;

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-3 gap-2 p-2 md:w-[400px] lg:w-[570px]">
              {categories.map((category) => (
                <li key={category.category_id}>
                  <Link
                    to={`/category/${category.category_id}`}
                    className="flex items-center gap-2 rounded-md p-1 transition hover:bg-default">
                    <img
                      src={category.category_logo_url}
                      alt={category.name}
                      className="size-10 rounded-full"
                    />
                    <span className="text-xs font-medium">{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Brands</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-3 gap-2 p-2 md:w-[400px] lg:w-[570px]">
              {brands.map((item) => (
                <li key={item.brand_id}>
                  <Link
                    to={`/brand/${item.brand_id}`}
                    className="flex items-center gap-2 rounded-md p-1 transition hover:bg-default">
                    <img
                      src={item.brand_logo_url}
                      alt={item.name}
                      className="size-10 rounded-full"
                    />
                    <span className="text-xs font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({ className: "bg-transparent" })}>
            <Link to="/combo-offer">Combo Offer</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({ className: "bg-transparent" })}>
            <Link to="/wholesale">Wholesale</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle({ className: "bg-transparent" })}>
            <Link to="/about-us">About Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
