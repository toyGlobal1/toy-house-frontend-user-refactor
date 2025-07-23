import { Autocomplete, AutocompleteItem, Button, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router";
import Swal from "sweetalert2";
import { useBuyNow } from "../hooks/useBuyNow";
import { useCart } from "../hooks/useCart";
import { placeOrder } from "../service/order.service";
import { orderZodSchema } from "../validations/order.schema";

const cities = [
  { id: "bagerhat", name: "Bagerhat" },
  { id: "bandarban", name: "Bandarban" },
  { id: "barguna", name: "Barguna" },
  { id: "barishal", name: "Barishal" },
  { id: "bhola", name: "Bhola" },
  { id: "bogura", name: "Bogura" },
  { id: "brahmanbaria", name: "Brahmanbaria" },
  { id: "chandpur", name: "Chandpur" },
  { id: "chattogram", name: "Chattogram" },
  { id: "chuadanga", name: "Chuadanga" },
  { id: "coxs-bazar", name: "Cox's Bazar" },
  { id: "cumilla", name: "Cumilla" },
  { id: "dhaka", name: "Dhaka" },
  { id: "dinajpur", name: "Dinajpur" },
  { id: "faridpur", name: "Faridpur" },
  { id: "feni", name: "Feni" },
  { id: "gaibandha", name: "Gaibandha" },
  { id: "gazipur", name: "Gazipur" },
  { id: "gopalganj", name: "Gopalganj" },
  { id: "habiganj", name: "Habiganj" },
  { id: "jamalpur", name: "Jamalpur" },
  { id: "jashore", name: "Jashore" },
  { id: "jhalokathi", name: "Jhalokathi" },
  { id: "jhenaidah", name: "Jhenaidah" },
  { id: "joypurhat", name: "Joypurhat" },
  { id: "khagrachhari", name: "Khagrachhari" },
  { id: "khulna", name: "Khulna" },
  { id: "kishoreganj", name: "Kishoreganj" },
  { id: "kurigram", name: "Kurigram" },
  { id: "kushtia", name: "Kushtia" },
  { id: "lakshmipur", name: "Lakshmipur" },
  { id: "lalmonirhat", name: "Lalmonirhat" },
  { id: "madaripur", name: "Madaripur" },
  { id: "magura", name: "Magura" },
  { id: "manikganj", name: "Manikganj" },
  { id: "meherpur", name: "Meherpur" },
  { id: "moulvibazar", name: "Moulvibazar" },
  { id: "munshiganj", name: "Munshiganj" },
  { id: "mymensingh", name: "Mymensingh" },
  { id: "naogaon", name: "Naogaon" },
  { id: "narail", name: "Narail" },
  { id: "narayanganj", name: "Narayanganj" },
  { id: "narsingdi", name: "Narsingdi" },
  { id: "natore", name: "Natore" },
  { id: "netrokona", name: "Netrokona" },
  { id: "nilphamari", name: "Nilphamari" },
  { id: "noakhali", name: "Noakhali" },
  { id: "pabna", name: "Pabna" },
  { id: "panchagarh", name: "Panchagarh" },
  { id: "patuakhali", name: "Patuakhali" },
  { id: "pirojpur", name: "Pirojpur" },
  { id: "rajbari", name: "Rajbari" },
  { id: "rajshahi", name: "Rajshahi" },
  { id: "rangamati", name: "Rangamati" },
  { id: "rangpur", name: "Rangpur" },
  { id: "satkhira", name: "Satkhira" },
  { id: "shariatpur", name: "Shariatpur" },
  { id: "sherpur", name: "Sherpur" },
  { id: "sirajganj", name: "Sirajganj" },
  { id: "sunamganj", name: "Sunamganj" },
  { id: "sylhet", name: "Sylhet" },
  { id: "tangail", name: "Tangail" },
  { id: "thakurgaon", name: "Thakurgaon" },
];

export default function CheckoutPage() {
  const { buyNow, increaseQuantity, decreaseQuantity } = useBuyNow();
  const { cart, clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const isBuyNow = searchParams.get("action") === "buyNow";

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: "Your order has been placed successfully!",
      });
      clearCart();
      navigate("/");
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please try again later.",
      });
    },
  });

  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(orderZodSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      city: "dhaka",
      shipping_address: "",
    },
  });

  const city = watch("city");
  const shippingCost = city ? (city === "dhaka" ? 60 : 120) : 0;

  const subtotal = useMemo(() => {
    if (isBuyNow && buyNow) {
      return buyNow.selling_price * (buyNow.quantity || 1);
    } else if (cart.length) {
      return cart.reduce((acc, item) => acc + (item.selling_price * item.quantity || 0), 0);
    }
    return 0;
  }, [cart, buyNow, isBuyNow]);

  const onSubmit = async (data) => {
    const items =
      isBuyNow && buyNow
        ? [
            {
              product_inventory_id: buyNow.id,
              quantity: buyNow.quantity,
            },
          ]
        : cart.map((item) => ({
            product_inventory_id: item.id,
            quantity: item.quantity,
          }));
    const payload = {
      items,
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      shipping_address: data.shipping_address,
      delivery_options: "INSIDE_DHAKA",
    };
    await mutateAsync(payload);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-2 text-center text-2xl font-normal underline md:text-3xl">Checkout</h1>
      <div className="rounded-2xl border p-1 shadow">
        <div>
          <table className="w-full table-auto">
            <thead className="w-full bg-zinc-600">
              <tr>
                <th className="rounded-l-[14px] px-4 py-3 text-center text-[8px] font-normal text-white sm:px-6 sm:text-sm md:px-8 md:text-base lg:px-10 lg:text-xl">
                  Order Summary
                </th>
                <th className="py-3 text-center text-[8px] font-normal text-white sm:py-4 sm:text-sm md:py-5 md:text-base lg:py-6 lg:text-xl">
                  Quantity
                </th>
                <th className="py-3 text-center text-[8px] font-normal text-white sm:py-4 sm:text-sm md:py-5 md:text-base lg:py-6 lg:text-xl">
                  Price
                </th>
                <th className="rounded-r-[14px] px-4 py-3 text-center text-[8px] font-normal text-white sm:px-6 sm:text-sm md:px-8 md:text-base lg:px-10 lg:text-xl">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {isBuyNow ? (
                <tr className="border-b-[2px] border-[#e0e0e0]">
                  <td className="font-poppins flex space-x-4 px-1 py-4 text-[8px] font-normal sm:px-2 sm:py-5 sm:text-sm md:px-4 md:py-6 md:text-base lg:py-7 lg:text-lg">
                    <div className="flex flex-col space-y-[2px] md:space-y-2 lg:space-y-3">
                      <h1 className="font-poppins line-clamp-2 text-sm font-semibold leading-tight sm:text-base md:text-lg">
                        {buyNow.product_name}
                      </h1>
                      <h1 className="font-roboto text-[8px] font-normal sm:text-sm md:text-base">
                        {buyNow.color_name}
                      </h1>
                    </div>
                  </td>
                  <td className="font-poppins py-4 text-center text-[10px] font-normal sm:py-5 sm:text-sm md:py-6 md:text-base lg:py-7 lg:text-lg">
                    <Button size="sm" isIconOnly onPress={() => decreaseQuantity(buyNow.id)}>
                      <LuMinus className="size-4" />
                    </Button>
                    <span className="mx-2">{buyNow.quantity}</span>
                    <Button size="sm" isIconOnly onPress={() => increaseQuantity(buyNow.id)}>
                      <LuPlus className="size-4" />
                    </Button>
                  </td>
                  <td className="font-poppins text-nowrap py-4 text-center text-[8px] font-normal sm:py-5 sm:text-sm md:py-6 md:text-base lg:py-7 lg:text-lg">
                    {buyNow.selling_price} Tk
                  </td>
                  <td className="font-poppins text-nowrap py-4 text-center text-[8px] font-normal sm:py-5 sm:text-sm md:py-6 md:text-base lg:py-7 lg:text-lg">
                    {(buyNow.quantity * buyNow.selling_price).toFixed(2)} Tk
                  </td>
                </tr>
              ) : cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item.id} className="border-b-[2px] border-[#e0e0e0]">
                    <td className="font-poppins flex space-x-4 px-1 py-4 text-[8px] font-normal sm:px-2 sm:py-5 sm:text-sm md:px-4 md:py-6 md:text-base lg:py-7 lg:text-lg">
                      <div className="flex flex-col space-y-[2px] md:space-y-2 lg:space-y-3">
                        <h1 className="font-poppins line-clamp-2 text-sm font-semibold leading-tight sm:text-base md:text-lg">
                          {item.product_name}
                        </h1>
                        <h1 className="font-roboto text-[8px] font-normal sm:text-sm md:text-base">
                          {item.color_name}
                        </h1>
                      </div>
                    </td>
                    <td className="font-poppins py-4 text-center text-[10px] font-normal sm:py-5 sm:text-sm md:py-6 md:text-base lg:py-7 lg:text-lg">
                      {item.quantity}
                    </td>
                    <td className="font-poppins text-nowrap py-4 text-center text-[8px] font-normal sm:py-5 sm:text-sm md:py-6 md:text-base lg:py-7 lg:text-lg">
                      {item.selling_price} Tk
                    </td>
                    <td className="font-poppins text-nowrap py-4 text-center text-[8px] font-normal sm:py-5 sm:text-sm md:py-6 md:text-base lg:py-7 lg:text-lg">
                      {(item.quantity * item.selling_price).toFixed(2)} Tk
                    </td>
                  </tr>
                ))
              ) : (
                <div className="py-10 text-center">
                  <h2 className="text-lg font-semibold">Your cart is empty</h2>
                </div>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end space-x-8 px-5 py-[10px]">
          <h1 className="font-poppins text-sm font-medium sm:text-base md:text-xl lg:text-[25px]">
            Subtotal
          </h1>
          <h1 className="font-poppins text-sm font-medium sm:text-base md:text-xl lg:text-[25px]">
            {subtotal} Tk
          </h1>
        </div>
      </div>
      <form className="mt-5 flex flex-col gap-10 md:flex-row" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <div className="mb-3 rounded-[10px] bg-zinc-600 px-2 py-2 sm:px-4 md:px-5 lg:px-[26px]">
            <h1 className="font-poppins text-sm font-normal text-white md:text-base lg:text-xl">
              Delivery Information
            </h1>
          </div>
          <div className="flex flex-col gap-5">
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error, invalid } }) => (
                <Input
                  {...field}
                  label="Name"
                  placeholder="Enter your name"
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
              name="phone_number"
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
              name="city"
              render={({ field, fieldState: { error, invalid } }) => (
                <Autocomplete
                  defaultItems={cities}
                  selectedKey={field.value}
                  onSelectionChange={(value) => field.onChange(value)}
                  label="City"
                  placeholder="Enter your city"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                  isInvalid={invalid}
                  errorMessage={error?.message}>
                  {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
                </Autocomplete>
              )}
            />

            <Controller
              control={control}
              name="shipping_address"
              render={({ field, fieldState: { error, invalid } }) => (
                <Textarea
                  {...field}
                  label="Shipping Address"
                  placeholder="Enter your shipping address"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="sm"
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-3 rounded-[10px] bg-zinc-600 px-[26px] py-2">
            <h1 className="font-poppins text-sm font-normal text-white md:text-base lg:text-xl">
              Billing Summary
            </h1>
          </div>
          <div className="mx-auto flex flex-col rounded-[14px] border-[2px] px-2">
            <div className="flex items-center justify-between border-b-[2px] px-2 py-3 md:py-4">
              <h1 className="font-poppins text-sm font-normal md:text-base">Item Total</h1>
              <h1 className="font-poppins text-sm font-normal md:text-base">Tk {subtotal}</h1>
            </div>
            <div className="flex items-center justify-between border-b-[2px] px-2 py-3 md:py-4">
              <h1 className="font-poppins text-sm font-normal md:text-base">Shipping</h1>
              <h1 className="font-poppins text-sm font-normal md:text-base">BDT {shippingCost}</h1>
            </div>
            <div className="flex items-center justify-between px-2 py-4">
              <h1 className="font-poppins text-sm font-normal md:text-base">Order Total</h1>
              <h1 className="font-poppins text-sm font-normal md:text-base">
                Tk {subtotal + shippingCost}
              </h1>
            </div>
          </div>
          <Button
            type="submit"
            color="primary"
            radius="sm"
            isLoading={isPending}
            isDisabled={isPending || !cart.length}
            className="mt-5 w-full font-medium uppercase">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}
