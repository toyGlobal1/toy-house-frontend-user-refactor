import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Input,
} from "@heroui/react";
import { useSuspenseQueries } from "@tanstack/react-query";
import { LuSearch } from "react-icons/lu";
import { BRAND_KEY, CATEGORY_KEY } from "../../constants/query-key";
import { getAllBrands } from "../../service/brand.service";
import { getAllCategories } from "../../service/category.service";

const priceRanges = [
  { label: "0 - 500", value: [0, 500] },
  { label: "500 - 2000", value: [500, 2000] },
  { label: "2000 - 5000", value: [2000, 5000] },
  { label: "5000 - 10000", value: [5000, 10000] },
  { label: "10000 - 15000", value: [10000, 15000] },
  { label: "15000+", value: [15000, Infinity] },
];

const ageGroups = [
  { label: "0-2", value: [0, 2] },
  { label: "3-5", value: [3, 5] },
  { label: "6-11", value: [6, 11] },
  { label: "12+", value: [12, Infinity] },
];

export function ProductFilter({
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
  const [{ data: categoryData }, { data: brandData }] = useSuspenseQueries({
    queries: [
      { queryKey: [CATEGORY_KEY], queryFn: getAllCategories },
      { queryKey: [BRAND_KEY], queryFn: getAllBrands },
    ],
  });

  const categories = categoryData?.categories || [];
  const brands = brandData?.brands || [];

  const handlePriceRangeChange = (value) => {
    onPriceRangeChange(
      selectedPriceRange[0] === value[0] && selectedPriceRange[1] === value[1]
        ? [0, Infinity]
        : value
    );
  };
  const handleAgeGroupChange = (value) => {
    onAgeGroupChange(
      selectedAgeGroup[0] === value[0] && selectedAgeGroup[1] === value[1] ? [0, Infinity] : value
    );
  };

  return (
    <div className="flex flex-col gap-4 rounded-md border px-3 py-10 shadow">
      <Input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-2"
        endContent={<LuSearch className="size-4" />}
        placeholder="Search products..."
        variant="bordered"
        size="sm"
      />
      {showCategory && (
        <Autocomplete
          defaultItems={categories}
          selectedKey={selectedCategory}
          onSelectionChange={(value) => onCategoryChange(value)}
          className="px-2"
          label="Category"
          placeholder="Select a category"
          labelPlacement="outside"
          variant="bordered"
          size="sm">
          {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
        </Autocomplete>
      )}
      {showBrand && (
        <Autocomplete
          defaultItems={brands}
          selectedKey={selectedBrand}
          onSelectionChange={(value) => onBrandChange(value)}
          className="px-2"
          label="Brand"
          placeholder="Select a brand"
          labelPlacement="outside"
          variant="bordered"
          size="sm">
          {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
        </Autocomplete>
      )}
      <Accordion selectionMode="multiple" variant="splitted" className="gap-2" isCompact>
        <AccordionItem
          key="1"
          aria-label="Price Range"
          title="Price Range"
          classNames={{ base: "rounded-md", title: "text-sm", trigger: "py-1.5" }}>
          <div className="flex flex-col gap-2">
            {priceRanges.map((item) => (
              <Checkbox
                key={item.label}
                size="sm"
                isSelected={selectedPriceRange === item.value}
                onChange={() => handlePriceRangeChange(item.value)}>
                BDT {item.label}
              </Checkbox>
            ))}
          </div>
        </AccordionItem>
        {showAgeGroup && (
          <AccordionItem
            key="2"
            aria-label="Age Group"
            title="Age Group"
            classNames={{ base: "rounded-md", title: "text-sm", trigger: "py-1.5" }}>
            <div className="flex flex-col gap-2">
              {ageGroups.map((item) => (
                <Checkbox
                  key={item.label}
                  size="sm"
                  isSelected={selectedAgeGroup === item.value}
                  onChange={() => handleAgeGroupChange(item.value)}>
                  {item.label} years
                </Checkbox>
              ))}
            </div>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
