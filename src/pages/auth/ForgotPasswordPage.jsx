import { Card, CardBody, CardHeader } from "@heroui/react";
import { ForgotPasswordForm } from "../../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="container my-20 flex items-center justify-center">
      <Card className="mx-auto max-w-md p-5">
        <CardHeader className="mb-5 flex-col">
          <h1 className="mb-1 text-2xl font-semibold text-gray-800">Forgot your password?</h1>
          <p className="text-center text-sm text-gray-600">
            Please enter your phone number to receive a code.
          </p>
        </CardHeader>
        <CardBody>
          <ForgotPasswordForm />
        </CardBody>
      </Card>
    </div>
  );
}
