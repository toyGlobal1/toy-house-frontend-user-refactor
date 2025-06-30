import { Button, Select, SelectItem } from "@heroui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProductFilter } from "../components/product/ProductFilter";
import { PRODUCT_KEY } from "../constants/query-key";
import { getAllProducts } from "../service/product.service";

export default function ProductPage() {
  const [showFilter, setShowFilter] = useState(true);
  const { data } = useSuspenseQuery({
    queryKey: [PRODUCT_KEY],
    queryFn: getAllProducts,
  });
  const products = data?.products || [];

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
        <Button size="sm" onPress={() => setShowFilter(!showFilter)}>
          {showFilter ? "Hide Filters" : "Show Filters"}
        </Button>
        <Select
          label="Sort By Price"
          placeholder="Select option"
          labelPlacement="outside-left"
          size="sm"
          className="max-w-[220px]">
          <SelectItem>Low to High</SelectItem>
          <SelectItem>High to Low</SelectItem>
        </Select>
      </div>
      <div className="mt-4 flex gap-10">
        {showFilter && <ProductFilter />}
        <div>hi</div>
      </div>
    </div>
  );
}
