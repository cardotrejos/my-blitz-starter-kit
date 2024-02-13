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

export let name = z
  .string()
  .min(3)
  .max(100)
  .transform((str) => str.trim())

export const SignupInput = z.object({
  email,
  name: name,
  password,
  terms: z
    .boolean()
    .refine((val) => val, { message: "You must agree to the terms and" + " conditions" }),
})

export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email,
  password,
})

export type LoginInputType = z.infer<typeof LoginInput>

export let ForgotPasswordInput = z.object({
  email,
})

export type ForgotPasswordInputType = z.infer<typeof ForgotPasswordInput>

export let ResetPasswordInput = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

export type ResetPasswordInputType = z.infer<typeof ResetPasswordInput>

export let ChangePasswordInput = z
  .object({
    currentPassword: password,
    newPassword: password,
    newPasswordConfirmation: password,
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords don't match",
    path: ["newPasswordConfirmation"],
  })

export type ChangePasswordInputType = z.infer<typeof ChangePasswordInput>
