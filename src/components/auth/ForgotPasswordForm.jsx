import { addToast, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { login } from "../../service/auth.service";
import { forgotPasswordZodSchema } from "../../validations/auth.schema";

export function ForgotPasswordForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(forgotPasswordZodSchema),
    defaultValues: { phone: "" },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Password reset link sent",
        color: "success",
      });
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Failed to send password reset link!",
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
        name="phone"
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
      <Button
        type="submit"
        color="primary"
        radius="sm"
        isLoading={isPending}
        isDisabled={isPending}
        className="mt-5 w-full font-medium uppercase">
        Send OTP
      </Button>
    </form>
  );
}
