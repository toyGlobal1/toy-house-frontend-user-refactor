import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { TanstackQueryProvider } from "./contexts/TanstackQueryProvider.jsx";
import { router } from "./routes/routes.jsx";

import { CartProvider } from "./contexts/CartProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      <TanstackQueryProvider>
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </AuthProvider>
      </TanstackQueryProvider>
    </HeroUIProvider>
  </StrictMode>
);
