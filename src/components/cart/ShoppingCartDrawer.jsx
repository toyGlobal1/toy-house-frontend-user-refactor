import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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
        <DrawerHeader className="flex flex-col gap-1">Shopping Cart</DrawerHeader>
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

  const subtotal = useMemo(() => {
    if (cart.length) {
      return cart.reduce((acc, item) => acc + (item.selling_price * item.quantity || 0), 0);
    }
    return 0;
  }, [cart]);

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-1">
        {cart.length ? (
          cart.map((cartItem) => (
            <div key={cartItem.id} className="flex items-center gap-2 border-b pb-1">
              <img
                src={cartItem.image_url}
                alt={cartItem.product_name}
                className="size-16 rounded-md border"
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
      {cart.length > 0 && (
        <div>
          <div>
            <p className="text-sm font-medium">
              Subtotal <span className="text-gray-500">(Shipping not included)</span>
            </p>
            <p className="text-lg font-bold">BDT {subtotal}</p>
          </div>
          <Button className="mt-2 w-full" onPress={handleCheckout}>
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
