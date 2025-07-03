import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { useQueries } from "@tanstack/react-query";
import { LuMenu } from "react-icons/lu";
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

export function HeaderNavDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" isIconOnly onPress={onOpen} className="md:hidden">
        <LuMenu className="size-4" />
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">Filter Products</DrawerHeader>
          <DrawerBody>
            <HeaderNavigationMenu />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function HeaderNavigationMenu() {
  const [
    { data: categoryData, isFetching: isFetchingCategories },
    { data: brandData, isFetching: isFetchingBrands },
  ] = useQueries({
    queries: [
      { queryKey: [CATEGORY_KEY], queryFn: getAllCategories },
      { queryKey: [BRAND_KEY], queryFn: getAllBrands },
    ],
  });

  const categories = categoryData?.categories;
  const brands = brandData?.brands;

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="flex-col">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-3 gap-2 p-2 md:w-[400px] lg:w-[570px]">
              {isFetchingCategories ? (
                <div className="col-span-3 text-center">
                  <Spinner />
                </div>
              ) : categories?.length ? (
                categories?.map((category) => (
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
                ))
              ) : (
                <p className="col-span-3 text-center text-sm">No categories found</p>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Brands</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-3 gap-2 p-2 md:w-[400px] lg:w-[570px]">
              {isFetchingBrands ? (
                <div className="col-span-3 text-center">
                  <Spinner />
                </div>
              ) : brands?.length ? (
                brands?.map((item) => (
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
                ))
              ) : (
                <p className="col-span-3 text-center text-sm">No brands found</p>
              )}
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
            <Link to="/about">About Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
