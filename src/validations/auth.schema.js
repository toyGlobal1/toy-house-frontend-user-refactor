import { z } from "zod";

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export const loginZodSchema = z.object({
  username: z
    .string()
    .min(1, "Phone number is required")
    .min(11, "Invalid phone number")
    .max(15, "Invalid phone number")
    .regex(phoneRegex, "Invalid phone number"),
  password: z.string().min(1, "Password is required"),
});

export const registerZodSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const forgotPasswordZodSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(11, "Invalid phone number")
    .max(15, "Invalid phone number")
    .regex(phoneRegex, "Invalid phone number"),
});
