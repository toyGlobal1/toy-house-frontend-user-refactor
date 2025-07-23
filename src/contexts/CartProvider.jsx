import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [buyNow, setBuyNow] = useState(() => {
    const savedBuyNow = localStorage.getItem("buyNow");
    return savedBuyNow ? JSON.parse(savedBuyNow) : null;
  });

  return (
    <CartContext.Provider value={{ cart, setCart, buyNow, setBuyNow }}>
      {children}
    </CartContext.Provider>
  );
}
