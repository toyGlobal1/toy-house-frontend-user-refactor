import { Card, CardBody, CardHeader } from "@heroui/react";
import { Link } from "react-router";
import loginBanner from "../../assets/auth/sign_in.webp";
import { LoginForm } from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="container my-10 grid gap-10 sm:grid-cols-2">
      <div>
        <img src={loginBanner} alt="Login Banner" className="h-3/4 w-full" />
      </div>
      <div>
        <Card className="p-5">
          <CardHeader className="mb-5 flex-col">
            <h1 className="mb-1 text-2xl font-bold leading-tight tracking-tight text-[#03b4f6] sm:text-4xl md:text-5xl">
              Welcome back!
            </h1>
            <p className="px-10 text-sm text-gray-600 md:text-base">
              Please log in to access your account and enjoy personalized features
            </p>
          </CardHeader>
          <CardBody>
            <LoginForm />
            <p className="mt-5 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-sky-500">
                Register
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
