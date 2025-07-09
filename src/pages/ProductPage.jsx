import { Button, Pagination, Select, SelectItem, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/product/ProductCard";
import { ProductFilter } from "../components/product/ProductFilter";
import { ProductFilterDrawer } from "../components/product/ProductFilterDrawer";
import { PRODUCT_KEY } from "../constants/query-key";
import { getAllProducts } from "../service/product.service";

export default function ProductPage() {
  const [showFilter, setShowFilter] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([0, Infinity]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const [products, setProducts] = useState([]);

  const { data, isFetching } = useQuery({
    queryKey: ["40-products"],
    queryFn: () => getAllProducts({ size: 20 }),
  });

  const { data: allProducts } = useQuery({
    queryKey: [PRODUCT_KEY],
    queryFn: getAllProducts,
  });

  useEffect(() => {
    if (allProducts?.products) {
      setProducts(allProducts.products);
    } else if (data?.products) {
      setProducts(data.products);
    }
  }, [data, allProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((item) => {
      // Match brand if a brand is selected, otherwise allow all
      const matchesBrand = !selectedBrand || item?.brand_name === selectedBrand;

      // Match category if a category is selected, otherwise allow all
      const matchesCategory = !selectedCategory || item?.category_name === selectedCategory;

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
      return matchesBrand && matchesCategory && matchesPrice && matchesAge && matchesSearch;
    });

    // Sorting
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.selling_price - b.selling_price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.selling_price - a.selling_price);
    }

    return filtered;
  }, [
    products,
    searchTerm,
    selectedBrand,
    selectedCategory,
    selectedAgeGroup,
    selectedPriceRange,
    sortOrder,
  ]);

  // Calculate total pages based on filtered products and rows per page
  const pages = filteredProducts.length ? Math.ceil(filteredProducts.length / rowsPerPage) : 1;

  // Calculate items for the current page
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    window.scrollTo(0, 0); // Scroll to top when page changes

    return filteredProducts.slice(start, end);
  }, [page, filteredProducts]);

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
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          selectedPriceRange={selectedPriceRange}
          selectedAgeGroup={selectedAgeGroup}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
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
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              selectedPriceRange={selectedPriceRange}
              selectedAgeGroup={selectedAgeGroup}
              onSearchChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
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
          ) : items.length ? (
            <div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="default"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
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
