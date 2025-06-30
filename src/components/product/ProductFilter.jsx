import { Accordion, AccordionItem, Autocomplete, AutocompleteItem, Checkbox } from "@heroui/react";
import { useSuspenseQueries } from "@tanstack/react-query";
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
  { label: "0-2", range: [0, 2] },
  { label: "3-5", range: [3, 5] },
  { label: "6-11", range: [6, 11] },
  { label: "12+", range: [12, Infinity] },
];

export function ProductFilter() {
  const [{ data: categoryData }, { data: brandData }] = useSuspenseQueries({
    queries: [
      { queryKey: [CATEGORY_KEY], queryFn: getAllCategories },
      { queryKey: [BRAND_KEY], queryFn: getAllBrands },
    ],
  });

  const categories = categoryData?.categories || [];
  const brands = brandData?.brands || [];

  return (
    <div className="flex w-1/4 flex-col gap-4 rounded-md border px-3 py-10 shadow">
      <Autocomplete
        defaultItems={categories}
        className="px-2"
        label="Category"
        placeholder="Search a category"
        labelPlacement="outside"
        variant="bordered"
        size="sm">
        {(item) => <AutocompleteItem key={item.category_id}>{item.name}</AutocompleteItem>}
      </Autocomplete>
      <Autocomplete
        defaultItems={brands}
        className="px-2"
        label="Brand"
        placeholder="Search a brand"
        labelPlacement="outside"
        variant="bordered"
        size="sm">
        {(item) => <AutocompleteItem key={item.brand_id}>{item.name}</AutocompleteItem>}
      </Autocomplete>
      <Accordion selectionMode="multiple" variant="splitted" className="gap-2" isCompact>
        <AccordionItem
          key="1"
          aria-label="Price Range"
          title="Price Range"
          classNames={{ base: "rounded-md", title: "text-sm", trigger: "py-1.5" }}>
          <div className="flex flex-col gap-2">
            {priceRanges.map((item) => (
              <Checkbox key={item.label} size="sm">
                {item.label}
              </Checkbox>
            ))}
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Age Group"
          title="Age Group"
          classNames={{ base: "rounded-md", title: "text-sm", trigger: "py-1.5" }}>
          <div className="flex flex-col gap-2">
            {ageGroups.map((item) => (
              <Checkbox key={item.label} size="sm">
                {item.label}
              </Checkbox>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
