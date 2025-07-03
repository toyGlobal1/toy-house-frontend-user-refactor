import { Button, Select, SelectItem, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { ProductCard } from "../components/product/ProductCard";
import { ProductFilter } from "../components/product/ProductFilter";
import { ProductFilterDrawer } from "../components/product/ProductFilterDrawer";
import { getAllProductsByAgeGroup } from "../service/product.service";

export default function AgeGroupProductsPage() {
  const [searchParams] = useSearchParams();
  const minAge = parseInt(searchParams.get("minAge")) || 0;
  const maxAge = parseInt(searchParams.get("maxAge")) || Infinity;

  const [showFilter, setShowFilter] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);

  const { data, isFetching } = useQuery({
    queryKey: ["ageGroupProducts", minAge, maxAge],
    queryFn: () => getAllProductsByAgeGroup(minAge, maxAge),
  });

  const filteredProducts = useMemo(() => {
    const products = data?.age_products || [];
    let filtered = products.filter((item) => {
      // Match brand if a brand is selected, otherwise allow all
      const matchesBrand = !selectedBrand || item?.brand_name === selectedBrand;

      // Match category if a category is selected, otherwise allow all
      const matchesCategory = !selectedCategory || item?.category_name === selectedCategory;

      // Match price range
      const matchesPrice =
        item?.selling_price >= selectedPriceRange[0] &&
        item?.selling_price <= selectedPriceRange[1];

      // Match search term in product name
      const matchesSearch =
        searchTerm === "" ||
        (item?.product_name || "").toLowerCase().includes(searchTerm.toLowerCase());

      // Only return products that match all criteria
      return matchesBrand && matchesCategory && matchesPrice && matchesSearch;
    });

    // Sorting
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.selling_price - b.selling_price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.selling_price - a.selling_price);
    }

    return filtered;
  }, [data, searchTerm, selectedBrand, selectedCategory, selectedPriceRange, sortOrder]);

  return (
    <div className="container my-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-400">Explore Our Product Collection</h1>
        <p className="mt-2 text-gray-600">
          Discover the best products that we have to offer. Our collection is curated to provide you
          with only the finest options.
        </p>
      </div>
      <div className="flex justify-between">
        <ProductFilterDrawer
          showAgeGroup={false}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          selectedPriceRange={selectedPriceRange}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onBrandChange={setSelectedBrand}
          onPriceRangeChange={setSelectedPriceRange}
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
              showAgeGroup={false}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              selectedPriceRange={selectedPriceRange}
              onSearchChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrand}
              onPriceRangeChange={setSelectedPriceRange}
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
