import { addToast, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { setAuthToken } from "../../lib/auth-token.util";
import { login } from "../../service/auth.service";
import { loginZodSchema } from "../../validations/auth.schema";
import { PasswordInput } from "../ui/PasswordInput";

export function LoginForm() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginZodSchema),
    defaultValues: { username: "", password: "" },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const accessToken = data?.accessToken;
      setAuthToken(accessToken);
      setIsAuthenticated(true);
      navigate("/");
      addToast({
        title: "Success",
        description: "Login successful",
        color: "success",
      });
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Failed to login!",
        color: "danger",
      });
    },
  });

  const onSubmit = async (data) => {
    await mutateAsync(data);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="username"
        render={({ field, fieldState: { error, invalid } }) => (
          <Input
            {...field}
            label="Phone Number"
            placeholder="Enter your phone number"
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />
      <div>
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error, invalid } }) => (
            <PasswordInput
              {...field}
              label="Password"
              placeholder="Enter your password"
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Link to="/forgot-password" className="mt-2 flex justify-end text-sm text-sky-500">
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        color="primary"
        radius="sm"
        isLoading={isPending}
        isDisabled={isPending}
        className="mt-5 w-full font-medium uppercase">
        Login
      </Button>
    </form>
  );
}
