import { useDisclosure } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CART_KEY } from "../../constants/query-key";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { getUserCart } from "../../service/cart.service";
import { ShoppingCartDrawer } from "../cart/ShoppingCartDrawer";
import { ProductImageZoom } from "./ProductImageZoom";

export function ProductImageGallery({
  currentImages,
  currentVideos,
  displayImageUrl,
  name,
  selectedInventory,
}) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const visibleItems = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data } = useQuery({
    queryKey: [CART_KEY],
    queryFn: getUserCart,
    enabled: isAuthenticated,
  });

  // Set default selected image and video
  const [currentSelectedImage, setCurrentSelectedImage] = useState(
    currentImages.length > 0 ? currentImages[0].image_url : ""
  );

  const [currentSelectedVideo, setCurrentSelectedVideo] = useState(
    currentVideos.length > 0 ? currentVideos[0].video_url : ""
  );

  useEffect(() => {
    if (currentImages.length > 0) {
      setCurrentSelectedImage(currentImages[0].image_url);
    }
  }, [currentImages]);

  const handleNext = () => {
    if (startIndex + visibleItems < currentImages.length + currentVideos.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedInventory || !selectedInventory.product_inventory_id) {
      console.error("Selected inventory is not available.");
      return;
    }
    const item = {
      id: selectedInventory.product_inventory_id,
      quantity: 1,
      product_name: name,
      image_url: displayImageUrl,
      color_name: selectedInventory.color,
      base_price: selectedInventory.base_price,
      selling_price: selectedInventory.selling_price,
    };
    addToCart(item);
    // if (currentQuantity === 0) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Out of Stock",
    //     text: "Sorry, this product is currently out of stock.",
    //     confirmButtonText: "OK",
    //   });
    //   return;
    // }

    // if (isAuthenticated) {
    //   setLoading(true);
    //   const formattedData = {
    //     items:
    //       Array.isArray(cart?.items) && cart.items.length > 0
    //         ? [
    //             ...cart.items.map((item) => ({
    //               product_inventory_id: Number(item.inventory_id),
    //               quantity: Number(item.quantity),
    //             })),
    //             {
    //               product_inventory_id: Number(id), // Assuming `id` is defined elsewhere
    //               quantity: 1,
    //             },
    //           ]
    //         : [
    //             {
    //               product_inventory_id: Number(id), // Assuming `id` is defined elsewhere
    //               quantity: 1,
    //             },
    //           ],
    //   };

    //   try {
    //     const response = await axiosInstance.post(
    //       "/api/v1/open/calculate-bill?request-id=1234",
    //       formattedData
    //     );
    //     console.log(response);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error adding product to cart:", error);
    //   }
    // } else {
    //   const existingCartArray = JSON.parse(localStorage.getItem("cart") || "[]");

    //   if (existingCartArray.length === 0) {
    //     setLoading(true);
    //     const formattedData = {
    //       items: [
    //         {
    //           product_inventory_id: Number(id),
    //           quantity: 1,
    //         },
    //       ],
    //     };

    //     console.log(formattedData);

    //     try {
    //       const data = await axiosInstance.post(
    //         "/api/v1/open/calculate-bill?request-id=1234",
    //         formattedData
    //       );
    //       if (data) {
    //         setLoading(false);
    //         const updatedCart = [data];
    //         console.log("Updated Cart:", updatedCart);
    //         localStorage.setItem("cart", JSON.stringify(updatedCart));

    //         Swal.fire({
    //           icon: "success",
    //           title: "Added to Cart",
    //           text: `${data.items[0].product_name?.slice(0, 15)} has been added to your cart.`,
    //           toast: true,
    //           position: "top-start",
    //           showConfirmButton: false,
    //           timer: 2500,
    //           timerProgressBar: true,
    //         });
    //       }
    //     } catch (error) {
    //       console.error("Error adding product to cart:", error);
    //     }
    //   } else {
    //     // Check if any item in the cart has the same SKU
    //     const matchSku = existingCartArray?.some((cart) =>
    //       cart?.items?.some((item) => item.inventory_id === id)
    //     );
    //     console.log("hi");

    //     if (matchSku) {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Product already here!",
    //         text: "This product is already in the cart",
    //         confirmButtonText: "OK",
    //       });
    //       return;
    //     } else {
    //       setLoading(true);
    //       const formattedData = {
    //         items: [
    //           ...(Array.isArray(existingCartArray) && existingCartArray.length > 0
    //             ? existingCartArray.flatMap((cart) =>
    //                 Array.isArray(cart.items)
    //                   ? cart.items.map((item) => ({
    //                       product_inventory_id: Number(item.inventory_id),
    //                       quantity: item.quantity,
    //                     }))
    //                   : []
    //               )
    //             : []),
    //           {
    //             product_inventory_id: Number(id),
    //             quantity: 1,
    //           },
    //         ],
    //       };
    //       try {
    //         const response = await axiosInstance.post(
    //           "/api/v1/open/calculate-bill?request-id=1234",
    //           formattedData
    //         );
    //         if (response.status === 200) {
    //           setLoading(false);
    //           const responseData = response?.data;

    //           const updatedCart = [responseData];
    //           localStorage.setItem("cart", JSON.stringify(updatedCart));
    //           Swal.fire({
    //             icon: "success",
    //             title: "Added to Cart",
    //             text: `${responseData.items[0].product_name?.slice(
    //               0,
    //               15
    //             )} has been added to your cart.`,
    //             toast: true,
    //             position: "top-start",
    //             showConfirmButton: false,
    //             timer: 2500,
    //             timerProgressBar: true,
    //           });
    //         }
    //       } catch (error) {
    //         console.error("Error adding product to cart:", error);
    //       }
    //     }
    //   }
    // }
    onOpen(); // Open the shopping cart drawer after adding to cart
  };

  const handleImageThumbnailClick = (imageUrl) => {
    setCurrentSelectedImage(imageUrl);
    setCurrentSelectedVideo(""); // Clear video selection
  };

  const handleVideoThumbnailClick = (videoUrl) => {
    setCurrentSelectedVideo(videoUrl); // Set the selected video URL
    setCurrentSelectedImage(""); // Clear image selection
  };

  return (
    <div>
      <div className="flex flex-row-reverse justify-evenly gap-5 lg:items-center">
        {/* Main Product Image and Add to Cart */}
        <div className="w-3/4 space-y-3 sm:w-[380px] md:w-[430px]">
          {currentSelectedVideo || currentSelectedImage ? (
            <ProductImageZoom
              selectedImage={currentSelectedImage}
              selectedVideo={currentSelectedVideo}
            />
          ) : (
            <div className="flex h-[430px] items-center justify-center">
              <h1 className="text-lg font-semibold text-gray-500">No images or videos available</h1>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="w-full transform cursor-pointer rounded-lg bg-[#317ff3] px-6 py-[6px] text-center text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#31b2f3] md:py-3 md:text-lg">
            {loading ? "Adding to Cart" : "Add To Cart"}
          </button>
        </div>

        {/* Image Thumbnails with Navigation Buttons */}
        <div className="flex flex-col items-center space-y-[6px] sm:space-y-3">
          {currentImages.length + currentVideos.length > visibleItems && (
            <button
              onClick={handlePrev}
              className={`flex w-[50px] transform justify-center rounded-lg border py-[2px] text-center font-semibold text-gray-800 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-300 sm:w-[87px] ${
                startIndex === 0 ? "cursor-not-allowed" : ""
              }`}
              disabled={startIndex === 0}>
              <FaChevronUp className="text-sm sm:text-xl" />
            </button>
          )}
          <div className="space-y-[6px] sm:space-y-3">
            {currentImages.slice(startIndex, startIndex + visibleItems).map((image, index) => (
              <img
                key={index}
                src={image.image_url}
                alt="Product Image Thumbnail"
                className="h-[70px] w-[100px] transform cursor-pointer rounded-lg border-2 object-cover transition-transform hover:scale-110 sm:h-[90px] sm:w-[120px]"
                onClick={() => handleImageThumbnailClick(image.image_url)}
              />
            ))}

            {currentVideos.slice(startIndex, startIndex + visibleItems).map((video, index) => (
              <div
                key={index}
                className="h-[70px] w-[120px] cursor-pointer border-2 sm:h-[90px]"
                onClick={() => handleVideoThumbnailClick(video?.video_url)}>
                <img
                  src={`https://img.youtube.com/vi/${video.video_url?.split("v=")[1]}/0.jpg`}
                  alt="YouTube Thumbnail"
                  className="h-full w-full transform rounded-lg object-cover transition-transform hover:scale-110"
                />
              </div>
            ))}
          </div>
          {currentImages.length + currentVideos.length > visibleItems && (
            <button
              onClick={handleNext}
              className={`flex w-[50px] transform justify-center rounded-lg border py-[2px] text-center font-semibold text-gray-800 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-300 sm:w-[87px] ${
                startIndex + visibleItems >= currentImages.length + currentVideos.length
                  ? "cursor-not-allowed"
                  : ""
              }`}
              disabled={startIndex + visibleItems >= currentImages.length + currentVideos.length}>
              <FaChevronDown className="text-sm sm:text-xl" />
            </button>
          )}
        </div>
      </div>
      <ShoppingCartDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
