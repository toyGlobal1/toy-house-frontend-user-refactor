import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AboutPage from "../pages/AboutPage";
import AgeGroupProductsPage from "../pages/AgeGroupProductsPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BrandProductsPage from "../pages/BrandProductsPage";
import CategoryProductsPage from "../pages/CategoryProductsPage";
import CheckoutPage from "../pages/CheckoutPage";
import ComboOfferPage from "../pages/ComboOfferPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import PrivacyPage from "../pages/PrivacyPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductPage from "../pages/ProductPage";
import ProfilePage from "../pages/ProfilePage";
import WholesalePage from "../pages/WholesalePage";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { path: "", Component: HomePage },
      {
        path: "",
        element: <PrivateRoute />,
        children: [{ path: "profile", Component: ProfilePage }],
      },
      {
        path: "",
        element: <AuthRoute />,
        children: [
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterPage },
          { path: "forgot-password", Component: ForgotPasswordPage },
        ],
      },
      { path: "products", Component: ProductPage },
      { path: "products/:id", Component: ProductDetailsPage },
      { path: "category/:id", Component: CategoryProductsPage },
      { path: "brand/:id", Component: BrandProductsPage },
      { path: "combo-offer", Component: ComboOfferPage },
      { path: "wholesale", Component: WholesalePage },
      { path: "age-group", Component: AgeGroupProductsPage },
      { path: "about", Component: AboutPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "checkout", Component: CheckoutPage },
    ],
  },
]);
