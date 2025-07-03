import {
  Accordion,
  AccordionItem,
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router";
import Editor from "../components/editor/Editor";
import { CustomerReviews } from "../components/product-details/CustomerReviews";
import { ProductImageGallery } from "../components/product-details/ProductImageGallery";
import { SimilarProducts } from "../components/product-details/SimilarProducts";
import { PRODUCT_KEY } from "../constants/query-key";
import { getProductById } from "../service/product.service";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data } = useSuspenseQuery({
    queryKey: [PRODUCT_KEY, id],
    queryFn: () => getProductById(id),
  });
  const inventories = data.product_inventory || [];

  const [selectedInventory, setSelectedInventory] = useState(inventories[0] || {});
  const [selectedColor, setSelectedColor] = useState(inventories[0]?.color || "");
  const [currentImages, setCurrentImages] = useState(inventories[0]?.product_images || []);
  const [currentVideos, setCurrentVideos] = useState(inventories[0]?.product_videos || []);
  const [selectedImage, setSelectedImage] = useState(currentImages[0] || null);
  const [selectedVideos, setSelectedVideos] = useState(currentVideos[0] || null);

  console.log(selectedInventory);

  const descriptionRef = useRef(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const handleVideoClick = (videoUrl) => {
    setSelectedVideos(videoUrl);
  };

  const handleColorClick = (inventory) => {
    setSelectedInventory(inventory);
    setCurrentImages(inventory.product_images);
    setCurrentVideos(inventory?.product_videos);
    setSelectedImage(inventory.product_images[0]?.image_url || null);
    setSelectedVideos(inventory?.product_videos[0]?.video_url || null);
    setSelectedColor(inventory.color);
  };

  return (
    <div className="container mb-5 mt-1 space-y-5">
      <Breadcrumbs>
        <BreadcrumbItem underline="hover">
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem underline="hover">
          <Link to={`/category/${data.category.category_id}`}>{data.category.name}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{data.product_name}</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col gap-10 md:flex-row">
        <ProductImageGallery
          id={selectedInventory.product_inventory_id}
          currentImages={currentImages}
          selectedImage={selectedImage}
          currentVideos={currentVideos}
          selectedVideos={selectedVideos}
          handleImageClick={handleImageClick}
          handleVideoClick={handleVideoClick}
          currentQuantity={selectedInventory.quantity}
          sku={data.sku}
        />
        <div className="flex w-full flex-col space-y-3 md:space-y-4 lg:flex-1">
          <div className="flex flex-col">
            <h1 className="font-inter text-lg font-medium sm:text-xl md:text-2xl lg:text-3xl">
              {data.product_name || "Product Name"}
            </h1>
            <div className="flex flex-col space-y-1">
              <div className="font-roboto flex flex-wrap items-center gap-2 text-xs font-normal text-[#959595]">
                <p>{data.return_and_refund_policy || 0} days easy return</p>
                <span>|</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-base ${
                        data.review >= star ? "text-yellow-500" : "text-gray-400"
                      }`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-[6px]">
            <div className="flex w-fit space-x-2 rounded-full py-1">
              <h1 className="font-roboto text-xs font-normal sm:text-sm md:text-base lg:text-lg">
                Colors:{" "}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                {data?.product_inventory?.map((color) => (
                  <div
                    key={color.product_inventory_id}
                    className={`font-poppins cursor-pointer gap-1 rounded-full border border-solid px-2 py-[2px] text-[10px] font-normal shadow-sm sm:px-3 sm:text-xs md:text-sm lg:px-4 ${
                      selectedColor === color.color
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-100 dark:text-gray-800"
                        : "dark:bg-white"
                    }`}
                    onClick={() => {
                      handleColorClick(color);
                      setSelectedColor(color.color);
                    }}>
                    <h1 className="font-roboto text-[8px] font-medium sm:text-xs">
                      {color?.color}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {selectedInventory?.quantity === 0 ? (
                <h1 className="font-roboto text-sm font-normal text-red-500">Out of stock</h1>
              ) : (
                <h1 className="font-roboto text-sm font-normal text-green-500">
                  {selectedInventory?.quantity} items are available
                </h1>
              )}
            </div>
          </div>

          <div className="font-roboto flex flex-col">
            <h1 className="font-roboto mt-1 text-lg text-[#90BE32] sm:text-xl lg:text-3xl">
              BDT {selectedInventory?.selling_price || 0}
            </h1>
            <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
              {selectedInventory?.base_price && (
                <p className="font-normal line-through">{selectedInventory?.base_price}</p>
              )}
              {selectedInventory?.discount_percent && (
                <p className="font-bold">{selectedInventory?.discount_percent}% OFF</p>
              )}
            </div>
          </div>
          <ProductDetailsAccordion
            highlights={data.summary}
            dimensions={data.dimensions}
            inTheBox={data.in_the_box}
          />
        </div>
      </div>
      <Card>
        <CardHeader className="justify-center">
          <h2 className="text-xl font-semibold uppercase">Product Details</h2>
        </CardHeader>
        <CardBody>
          {data.product_description ? (
            <Editor ref={descriptionRef} defaultValue={data.product_description} readOnly={true} />
          ) : (
            <div className="text-sm text-gray-500">Details Not Available</div>
          )}
        </CardBody>
      </Card>
      <div>
        <h2 className="text-center text-xl font-semibold uppercase">Customer Reviews</h2>
        <CustomerReviews productId={id} />
      </div>
      <div>
        <SimilarProducts productId={data.product_id} categoryId={data.category.category_id} />
      </div>
    </div>
  );
}

function ProductDetailsAccordion({ highlights, dimensions, inTheBox }) {
  const highlightsRef = useRef(null);
  const inTheBoxRef = useRef(null);

  return (
    <Accordion isCompact className="rounded-lg border-2" defaultSelectedKeys={["1"]}>
      <AccordionItem key="1" aria-label="highlights" title="Highlights">
        {highlights ? (
          <Editor ref={highlightsRef} defaultValue={highlights} readOnly={true} />
        ) : (
          <div className="text-sm text-gray-500">Information Not Available</div>
        )}
      </AccordionItem>
      <AccordionItem key="2" aria-label="dimensions" title="Dimensions">
        {dimensions?.map((item) => (
          <div
            key={item.dimension_id}
            className="space-y-5 text-sm [&_strong]:inline-block [&_strong]:font-medium">
            <div className="flex items-center gap-3">
              <div>
                <strong>Type:</strong> {item.type}
              </div>
              <div>
                <strong>Height:</strong> {item.height} {item.dimension_unit}
              </div>
              <div>
                <strong>Width:</strong> {item.width} {item.dimension_unit}
              </div>
              <div>
                <strong>Depth:</strong> {item.depth} {item.dimension_unit}
              </div>
              <div>
                <strong>Weight:</strong> {item.weight} {item.weight_unit}
              </div>
            </div>
          </div>
        ))}
      </AccordionItem>
      <AccordionItem key="3" aria-label="in-the-box" title="In The Box">
        {inTheBox ? (
          <Editor ref={inTheBoxRef} defaultValue={inTheBox} readOnly={true} />
        ) : (
          <div className="text-sm text-gray-500">Information Not Available</div>
        )}
      </AccordionItem>
    </Accordion>
  );
}
