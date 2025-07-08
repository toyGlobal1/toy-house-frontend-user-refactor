import { z } from "zod";
import { phoneZodSchema } from "./auth.schema";

export const orderZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: phoneZodSchema,
  city: z.string().min(1, "City is required"),
  shipping_address: z.string().min(1, "Shipping address is required"),
});
