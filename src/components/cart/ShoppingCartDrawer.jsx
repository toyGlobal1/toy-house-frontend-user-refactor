import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";

import { useQuery } from "@tanstack/react-query";
import { LuMinus, LuPlus, LuX } from "react-icons/lu";
import { useNavigate } from "react-router";
import { CART_KEY } from "../../constants/query-key";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
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
  const { cart, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useCart();
  const { data: cartData } = useQuery({
    queryKey: [CART_KEY],
    queryFn: getUserCart,
    enabled: isAuthenticated,
  });
  const navigate = useNavigate();

  // const totalPrice = useMemo(() => {
  //   if (isAuthenticated) {
  //     return cart ? cart.sub_total : 0;
  //   } else {
  //     return existingCart?.reduce((acc, cartEntry) => {
  //       return (
  //         acc +
  //         (cartEntry?.items?.reduce(
  //           (subTotal, item) =>
  //             subTotal + (parseFloat(item.selling_price) || 0) * (item.quantity || 1),
  //           0
  //         ) || 0)
  //       );
  //     }, 0);
  //   }
  // }, [isAuthenticated, cart]);

  // const handleCheckout = async () => {
  //   if (isAuthenticated) {
  //     if (!cart || cart.length === 0) {
  //       Swal.fire({
  //         toast: true,
  //         position: "top-start",
  //         icon: "error",
  //         title: "Your cart is empty",
  //         showConfirmButton: false,
  //         timer: 3000,
  //       });
  //       return; // Prevent the order from being submitted
  //     }
  //     setCheckoutLoading(true);
  //     onClose();
  //     // Simulate checkout process
  //     setTimeout(() => {
  //       navigate("/checkout");
  //     }, 1000);
  //   } else {
  //     if (!existingCart || existingCart.length === 0) {
  //       Swal.fire({
  //         toast: true,
  //         position: "top-start",
  //         icon: "error",
  //         title: "Your cart is empty",
  //         showConfirmButton: false,
  //         timer: 3000,
  //       });
  //       return;
  //     }

  //     const formattedData = {
  //       items: existingCart.flatMap((cartItem) =>
  //         cartItem.items.map((item) => ({
  //           product_inventory_id: item.inventory_id,
  //           quantity: item.quantity,
  //         }))
  //       ),
  //     };

  //     try {
  //       const response = await axiosInstance.post(
  //         "/api/v1/open/calculate-bill?request-id=1234",
  //         formattedData
  //       );
  //       if (response.status === 200) {
  //         const responseData = response?.data;
  //         const updatedCart = [responseData];
  //         localStorage.setItem("checkout", JSON.stringify(updatedCart));
  //         setCheckoutLoading(true);
  //         onClose();
  //         navigate("/checkout");
  //         window.location.reload();
  //       }
  //     } catch (error) {
  //       console.error("Error adding product to cart:", error);
  //     }
  //   }
  // };

  return (
    <div>
      <div className="flex flex-col gap-1">
        {cart.length ? (
          cart.map((cartItem) => (
            <div key={cartItem.id} className="flex items-center gap-2 border-b pb-1">
              <img
                src={cartItem.image_url}
                alt={cartItem.product_name}
                className="size-16 rounded-md border object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="line-clamp-2 font-medium">{cartItem.product_name}</h3>
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-danger-400 p-0.5 text-danger-foreground transition-all hover:bg-danger"
                    onClick={() => removeFromCart(cartItem.id)}>
                    <LuX className="size-3" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">Color: {cartItem.color_name}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      className="inline-flex items-center justify-center rounded-md bg-default p-1"
                      onClick={() => decreaseItemQuantity(cartItem.id)}>
                      <LuMinus className="size-3.5" />
                    </button>
                    <span className="text-sm font-medium">{cartItem.quantity}</span>
                    <button
                      className="inline-flex items-center justify-center rounded-md bg-default p-1"
                      onClick={() => increaseItemQuantity(cartItem.id)}>
                      <LuPlus className="size-3.5" />
                    </button>
                  </div>
                  <p className="font-medium">BDT {cartItem.selling_price * cartItem.quantity}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center font-medium text-gray-500">Your cart is empty</p>
        )}
      </div>
      <Button>Checkout</Button>
    </div>
  );
}
