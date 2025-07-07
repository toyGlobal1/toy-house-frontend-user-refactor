import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { RxPlus } from "react-icons/rx";
import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";
import { LuX } from "react-icons/lu";
import { useNavigate } from "react-router";
import { CART_KEY } from "../../constants/query-key";
import { useAuth } from "../../hooks/useAuth";
import { axiosInstance } from "../../lib/axios.config";
import { getUserCart } from "../../service/cart.service";

export function ShoppingCartDrawer({ isOpen, onOpenChange, onClose }) {
  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right">
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1">Cart</DrawerHeader>
        <DrawerBody>
          <ShoppingCart onClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function ShoppingCart({ onClose }) {
  const { isAuthenticated } = useAuth();
  const [existingCart, setExistingCart] = useState([]);
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);
  const { data: cart, refetch: cartRefetch } = useQuery({
    queryKey: [CART_KEY],
    queryFn: () => getUserCart(),
    enabled: isAuthenticated,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Safely parse the stored cart on mount
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setExistingCart(JSON.parse(storedCart) || []);
      } catch (e) {
        console.error("Failed to parse cart from sessionStorage", e);
      }
    }

    // Sync cart with sessionStorage on storage change or focus
    const syncCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          setExistingCart(JSON.parse(storedCart) || []);
        } catch (e) {
          console.error("Failed to parse cart during sync", e);
        }
      }
    };

    window.addEventListener("storage", syncCart);
    window.addEventListener("focus", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("focus", syncCart);
    };
  }, []);

  useEffect(() => {
    if (existingCart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(existingCart));
    } else {
      localStorage.removeItem("cart"); // Remove cart if empty
    }
  }, [existingCart]);

  const handleRemove = (inventory_id) => {
    const updatedCart = existingCart
      .map((cartEntry) => ({
        ...cartEntry,
        items: cartEntry.items.filter((item) => item.inventory_id !== inventory_id),
      }))
      .filter((cartEntry) => cartEntry.items.length > 0);

    setExistingCart(updatedCart);

    // Remove from localStorage and sessionStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDeleteCart = async (inventory_id) => {
    const updatedItems = cart.items.filter((item) => item.inventory_id !== inventory_id);

    // Create the formatted data to send to the backend
    const formattedData = {
      items: [
        ...updatedItems.map((item) => ({
          product_inventory_id: item.inventory_id,
          quantity: item.quantity,
        })),
      ],
    };
    try {
      const response = await axiosInstance.post(
        "/api/v1/open/calculate-bill?request-id=1234",
        formattedData
      );
      if (response) {
        cartRefetch();
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleUserIncrease = async (inventory_id) => {
    // Update the items in the cart: Increase quantity for matching inventory_id
    const updatedItems = cart.items.map((item) => {
      if (item.inventory_id === inventory_id) {
        return { ...item, quantity: item.quantity + 1 }; // Increase quantity by 1 if SKU matches
      }
      return item; // Keep the other items the same
    });

    // Create the formatted data to send to the backend
    const formattedData = {
      items: [
        ...updatedItems.map((item) => ({
          product_inventory_id: item.inventory_id,
          quantity: item.quantity,
        })),
      ],
    };

    try {
      const response = await axiosInstance.post(
        "/api/v1/open/calculate-bill?request-id=1234",
        formattedData
      );
      if (response) {
        cartRefetch();
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleUserDecrease = async (inventory_id) => {
    // Update the items in the cart: Decrease quantity for matching inventory_id but not less than 1
    const updatedItems = cart.items.map((item) => {
      if (item.inventory_id === inventory_id) {
        return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }; // Decrease quantity by 1 if > 1
      }
      return item; // Keep the other items the same
    });

    // Create the formatted data to send to the backend
    const formattedData = {
      items: [
        ...updatedItems.map((item) => ({
          product_inventory_id: item.inventory_id,
          quantity: item.quantity,
        })),
      ],
    };

    try {
      const response = await axiosInstance.post(
        "/api/v1/open/calculate-bill?request-id=1234",
        formattedData
      );
      if (response) {
        cartRefetch();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleIncrease = (inventory_id) => {
    console.log(inventory_id);

    const updatedCart = existingCart.map((cartEntry) => ({
      ...cartEntry,
      items: cartEntry.items.map((item) =>
        item.inventory_id === inventory_id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));

    setExistingCart(updatedCart);

    // Update localStorage with the new cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrease = (inventory_id, quantity) => {
    if (quantity > 1) {
      const updatedCart = existingCart.map((cartEntry) => ({
        ...cartEntry,
        items: cartEntry.items.map((item) =>
          item.inventory_id === inventory_id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      }));

      setExistingCart(updatedCart);

      // Update localStorage with the new cart
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const totalPrice = useMemo(() => {
    if (isAuthenticated) {
      return cart ? cart.sub_total : 0;
    } else {
      return existingCart?.reduce((acc, cartEntry) => {
        return (
          acc +
          (cartEntry?.items?.reduce(
            (subTotal, item) =>
              subTotal + (parseFloat(item.selling_price) || 0) * (item.quantity || 1),
            0
          ) || 0)
        );
      }, 0);
    }
  }, [isAuthenticated, cart, existingCart]);

  const handleCheckout = async () => {
    if (isAuthenticated) {
      if (!cart || cart.length === 0) {
        Swal.fire({
          toast: true,
          position: "top-start",
          icon: "error",
          title: "Your cart is empty",
          showConfirmButton: false,
          timer: 3000,
        });
        return; // Prevent the order from being submitted
      }
      setCheckoutLoading(true);
      onClose();
      // Simulate checkout process
      setTimeout(() => {
        navigate("/checkout");
      }, 1000);
    } else {
      if (!existingCart || existingCart.length === 0) {
        Swal.fire({
          toast: true,
          position: "top-start",
          icon: "error",
          title: "Your cart is empty",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      const formattedData = {
        items: existingCart.flatMap((cartItem) =>
          cartItem.items.map((item) => ({
            product_inventory_id: item.inventory_id,
            quantity: item.quantity,
          }))
        ),
      };

      try {
        const response = await axiosInstance.post(
          "/api/v1/open/calculate-bill?request-id=1234",
          formattedData
        );
        if (response.status === 200) {
          const responseData = response?.data;
          const updatedCart = [responseData];
          localStorage.setItem("checkout", JSON.stringify(updatedCart));
          setCheckoutLoading(true);
          onClose();
          navigate("/checkout");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
  };

  return (
    <div className="bg-base-200 flex h-screen w-full flex-col justify-between text-[#2F3132] shadow">
      <div className="h-full overflow-y-auto">
        {isAuthenticated ? (
          cart?.length === 0 ? (
            <div className="py-10 text-center">
              <h2 className="text-lg font-semibold text-gray-500">Your cart is empty</h2>
            </div>
          ) : (
            cart?.items?.map((item) => (
              <div key={item.inventory_id} className="flex flex-col justify-start">
                <div className="md::px-[10px] flex justify-between gap-1 border-b px-1 py-2">
                  <img
                    src={item.image_url || "/default-image.jpg"}
                    alt={item.product_name || "Product Image"}
                    className="size-20 rounded-md bg-white"
                  />
                  <div className="flex flex-1 flex-col space-y-3 dark:bg-white dark:text-black">
                    <div className="flex justify-between gap-2">
                      <div className="flex flex-col md:px-2">
                        <h1 className="font-poppins line-clamp-2 text-sm font-semibold md:text-lg">
                          {item.product_name}
                        </h1>
                        <h1 className="text-xs font-normal md:text-base">
                          Color: {item?.color_name}
                        </h1>
                      </div>
                      <div>
                        <MdCancel
                          onClick={() => handleDeleteCart(item.inventory_id)}
                          className="cursor-pointer text-xl font-black text-red-500 dark:text-red-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-2 dark:bg-white dark:text-black">
                      <div className="flex items-center gap-3 rounded-full bg-white p-[2px]">
                        <h1
                          onClick={() => handleUserDecrease(item.inventory_id)}
                          className="bg-base-200 cursor-pointer rounded-full p-[4px] text-base font-semibold md:p-2 md:text-2xl dark:bg-white dark:text-black">
                          <FiMinus />
                        </h1>
                        <h1 className="font-poppins text-base font-semibold md:text-xl">
                          {item.quantity}
                        </h1>
                        <h1
                          onClick={() => handleUserIncrease(item.inventory_id)}
                          className="bg-base-200 cursor-pointer rounded-full p-[4px] text-base font-bold md:p-2 md:text-2xl dark:bg-white dark:text-black">
                          <RxPlus />
                        </h1>
                      </div>
                      <h1 className="font-poppins text-sm font-semibold md:text-xl">
                        BDT {(item.selling_price * item.quantity).toFixed(2)}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        ) : existingCart?.length > 0 ? (
          <div>
            {existingCart?.map((cartEntry, index) => (
              <div key={index} className="flex flex-col justify-start">
                {cartEntry.items && cartEntry.items.length > 0
                  ? cartEntry.items.map((item) => (
                      <div
                        key={item.inventory_id}
                        className="md::px-[10px] flex justify-between gap-1 border-b px-1 py-2">
                        <img
                          src={item.image_url || "/default-image.jpg"}
                          alt={item.product_name || "Product Image"}
                          className="size-[100px] rounded-md"
                        />
                        <div className="flex flex-1 flex-col space-y-3 dark:bg-white dark:text-black">
                          <div className="flex justify-between gap-2">
                            <div className="flex flex-col md:px-2">
                              <h1 className="line-clamp-2 text-sm font-medium">
                                {item.product_name}
                              </h1>
                              <h1 className="text-xs font-normal">Color: {item?.color_name}</h1>
                            </div>
                            <button
                              className="inline-flex h-fit cursor-pointer items-center justify-center rounded-full bg-danger-300 p-0.5 text-danger-foreground transition-all hover:bg-danger"
                              onClick={() => handleRemove(item.inventory_id)}>
                              <LuX className="size-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between px-2 dark:bg-white dark:text-black">
                            <div className="flex items-center gap-3 rounded-full bg-white p-[2px]">
                              <h1
                                onClick={() => handleDecrease(item?.inventory_id, item.quantity)}
                                className="bg-base-200 cursor-pointer rounded-full p-[4px] text-base font-semibold md:p-2 md:text-2xl dark:bg-white dark:text-black">
                                <FiMinus />
                              </h1>
                              <h1 className="font-poppins text-base font-semibold md:text-xl">
                                {item.quantity}
                              </h1>
                              <h1
                                onClick={() => handleIncrease(item.inventory_id)}
                                className="bg-base-200 cursor-pointer rounded-full p-[4px] text-base font-bold md:p-2 md:text-2xl dark:bg-white dark:text-black">
                                <RxPlus />
                              </h1>
                            </div>
                            <h1 className="font-poppins text-sm font-semibold md:text-xl">
                              BDT {(item.selling_price * item.quantity).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center">
            <h2 className="text-lg font-semibold dark:text-black">Your cart is empty</h2>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 w-full bg-white shadow-lg dark:bg-white">
        <div className="mx-auto w-11/12 space-y-3 py-3 md:space-y-5 md:py-5">
          <div className="space-y-1 md:space-y-[6px]">
            <h1 className="font-poppins text-sm font-semibold">
              Subtotal: <span className="font-normal text-[#787878]">(Shipping not Included)</span>
            </h1>
            <h1 className="font-poppins text-lg font-semibold md:text-4xl">
              BDT {totalPrice?.toFixed(2) || 0}
            </h1>
          </div>
          <button
            onClick={handleCheckout}
            className="font-poppins buttons mb-[2px] w-full rounded-3xl text-sm font-semibold max-md:py-[6px] md:text-lg">
            {isCheckoutLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
