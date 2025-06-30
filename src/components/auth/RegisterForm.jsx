import { addToast, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { register } from "../../service/auth.service";
import { registerZodSchema } from "../../validations/auth.schema";
import { PasswordInput } from "../ui/PasswordInput";

export function RegisterForm() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerZodSchema),
    defaultValues: { username: "", name: "", phone_number: "", password: "" },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      // const accessToken = data?.accessToken;
      console.log(data);
      navigate("/");
      addToast({
        title: "Success",
        description: "Registration successful",
        color: "success",
      });
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Failed to register!",
        color: "danger",
      });
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    // await mutateAsync(data);
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
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error, invalid } }) => (
          <Input
            {...field}
            label="Full Name"
            placeholder="Enter your full name"
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error, invalid } }) => (
          <Input
            {...field}
            label="Email"
            placeholder="Enter your email"
            labelPlacement="outside"
            variant="bordered"
            radius="sm"
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />
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
      <Button
        type="submit"
        color="primary"
        radius="sm"
        isLoading={isPending}
        isDisabled={isPending}
        className="mt-5 w-full font-medium uppercase">
        Register
      </Button>
    </form>
  );
}
