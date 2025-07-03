import { Card, CardBody, CardHeader } from "@heroui/react";
import { Link } from "react-router";
import registerBanner from "../../assets/auth/sign_up.webp";
import { RegisterForm } from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container my-10 grid gap-10 sm:grid-cols-2">
      <div>
        <img src={registerBanner} alt="Login Banner" className="h-3/4 w-full" />
      </div>
      <div>
        <Card className="p-5">
          <CardHeader className="flex-col">
            <h1 className="mb-1 text-2xl font-bold leading-tight tracking-tight text-[#03b4f6] sm:text-4xl md:text-5xl">
              Join Us Today!
            </h1>
          </CardHeader>
          <CardBody>
            <RegisterForm />
            <p className="mt-5 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-sky-500">
                Login
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
