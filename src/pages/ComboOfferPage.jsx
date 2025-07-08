import { Button, Select, SelectItem, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/product/ProductCard";
import { ProductFilter } from "../components/product/ProductFilter";
import { ProductFilterDrawer } from "../components/product/ProductFilterDrawer";
import { getAllProductsByCategory } from "../service/product.service";

export default function ComboOfferPage() {
  const [showFilter, setShowFilter] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([0, Infinity]);

  const { data, isFetching } = useQuery({
    queryKey: ["categoryProducts", 35],
    queryFn: () => getAllProductsByCategory(35),
  });

  const filteredProducts = useMemo(() => {
    const products = data?.category_products || [];
    let filtered = products.filter((item) => {
      // Match brand if a brand is selected, otherwise allow all
      const matchesBrand = !selectedBrand || item?.brand_name === selectedBrand;

      // Match price range
      const matchesPrice =
        item?.selling_price >= selectedPriceRange[0] &&
        item?.selling_price <= selectedPriceRange[1];

      // Match age group if age is selected, otherwise allow all
      const matchesAge =
        item?.minimum_age_range >= selectedAgeGroup[0] &&
        item?.maximum_age_range <= selectedAgeGroup[1];

      // Match search term in product name
      const matchesSearch =
        searchTerm === "" ||
        (item?.product_name || "").toLowerCase().includes(searchTerm.toLowerCase());

      // Only return products that match all criteria
      return matchesBrand && matchesPrice && matchesAge && matchesSearch;
    });

    // Sorting
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.selling_price - b.selling_price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.selling_price - a.selling_price);
    }

    return filtered;
  }, [data, searchTerm, selectedBrand, selectedAgeGroup, selectedPriceRange, sortOrder]);

  return (
    <div className="container my-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-400">Combo Offers</h1>
        <p className="mt-2 text-gray-600">
          Explore our exclusive combo offers on toys and games. Perfect for gifting or treating your
          little ones!
        </p>
      </div>
      <div className="flex justify-between">
        <ProductFilterDrawer
          showCategory={false}
          searchTerm={searchTerm}
          selectedBrand={selectedBrand}
          selectedPriceRange={selectedPriceRange}
          selectedAgeGroup={selectedAgeGroup}
          onSearchChange={setSearchTerm}
          onBrandChange={setSelectedBrand}
          onPriceRangeChange={setSelectedPriceRange}
          onAgeGroupChange={setSelectedAgeGroup}
        />
        <Button size="sm" onPress={() => setShowFilter(!showFilter)} className="hidden md:block">
          {showFilter ? "Hide Filters" : "Show Filters"}
        </Button>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Sort By Price"
          placeholder="Select option"
          labelPlacement="outside-left"
          variant="bordered"
          size="sm"
          className="max-w-[220px]">
          <SelectItem key="asc">Low to High</SelectItem>
          <SelectItem key="desc">High to Low</SelectItem>
        </Select>
      </div>
      <div className="mt-4 flex gap-5">
        {showFilter && (
          <div className="hidden md:block">
            <ProductFilter
              showCategory={false}
              searchTerm={searchTerm}
              selectedBrand={selectedBrand}
              selectedPriceRange={selectedPriceRange}
              selectedAgeGroup={selectedAgeGroup}
              onSearchChange={setSearchTerm}
              onBrandChange={setSelectedBrand}
              onPriceRangeChange={setSelectedPriceRange}
              onAgeGroupChange={setSelectedAgeGroup}
            />
          </div>
        )}
        <div className="flex-1">
          {isFetching ? (
            <div className="flex h-64 items-center justify-center">
              <Spinner label="Loading products..." />
            </div>
          ) : filteredProducts.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-10 text-center text-lg font-medium text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
