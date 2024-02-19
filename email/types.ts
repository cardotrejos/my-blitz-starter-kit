import { ReactElement } from "react"

export type Email = {
  subject: string
  to: string
  react: ReactElement | null
}

export enum EmailTemplate {
  Dummy = "dummy",
  Welcome = "welcome",
  VerifyEmail = "verify-email",
  ResetPassword = "reset-password",
  BlackFridaySale = "black-friday-sale",
}
