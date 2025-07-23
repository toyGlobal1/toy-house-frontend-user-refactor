import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartProvider";

export function useBuyNow() {
  const { buyNow, setBuyNow } = useContext(CartContext);

  // Save buyNow to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("buyNow", JSON.stringify(buyNow));
  }, [buyNow]);

  const addToBuyNow = (item) => {
    setBuyNow(item);
  };

  const increaseQuantity = (itemId) => {
    setBuyNow((prevBuyNow) => {
      if (prevBuyNow && prevBuyNow.id === itemId) {
        return { ...prevBuyNow, quantity: (prevBuyNow.quantity || 1) + 1 };
      }
      return prevBuyNow;
    });
  };

  const decreaseQuantity = (itemId) => {
    setBuyNow((prevBuyNow) => {
      if (prevBuyNow && prevBuyNow.id === itemId && prevBuyNow.quantity > 1) {
        return { ...prevBuyNow, quantity: prevBuyNow.quantity - 1 };
      }
      return prevBuyNow;
    });
  };

  const clearBuyNow = () => {
    setBuyNow(null);
  };

  return { buyNow, addToBuyNow, increaseQuantity, decreaseQuantity, clearBuyNow };
}
