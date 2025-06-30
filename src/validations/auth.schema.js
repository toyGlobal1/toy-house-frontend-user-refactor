import { z } from "zod";

export const loginZodSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerZodSchema = z.object({
  username: z.string().min(1, "Username is required"),
  name: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{11}$/, "Phone number must be 11 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
