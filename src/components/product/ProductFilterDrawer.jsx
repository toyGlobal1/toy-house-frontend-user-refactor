import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { ProductFilter } from "./ProductFilter";

export function ProductFilterDrawer({
  showCategory = true,
  showBrand = true,
  showAgeGroup = true,
  searchTerm,
  onSearchChange,
  selectedCategory,
  selectedBrand,
  selectedPriceRange,
  selectedAgeGroup,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onAgeGroupChange,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" onPress={onOpen} className="md:hidden">
        Show Filters
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left" size="xs">
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">Filter Products</DrawerHeader>
          <DrawerBody>
            <ProductFilter
              showCategory={showCategory}
              showBrand={showBrand}
              showAgeGroup={showAgeGroup}
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              selectedPriceRange={selectedPriceRange}
              selectedAgeGroup={selectedAgeGroup}
              onCategoryChange={onCategoryChange}
              onBrandChange={onBrandChange}
              onPriceRangeChange={onPriceRangeChange}
              onAgeGroupChange={onAgeGroupChange}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
