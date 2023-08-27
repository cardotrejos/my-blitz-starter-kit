import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const SignupInput = z.object({
  email,
  name: z.string().optional(),
  password,
  terms: z
    .boolean()
    .refine((val) => val, { message: "You must agree to the terms and" + " conditions" }),
})
