import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartProvider";

export function useCart() {
  const { cart, setCart } = useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used within a CartProvider");
  }

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingItem = cart.length ? cart.find((cartItem) => cartItem.id === item.id) : null;
    if (!existingItem) {
      setCart((prevCart) => [...prevCart, item]);
    }
  };

  const increaseItemQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseItemQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return { cart, addToCart, increaseItemQuantity, decreaseItemQuantity, removeFromCart, clearCart };
}
