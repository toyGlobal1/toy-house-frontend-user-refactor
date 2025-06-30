import { Spinner } from "@heroui/react";
import { Suspense } from "react";
import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Suspense
          fallback={
            <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
              <Spinner size="lg" />
            </div>
          }>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
