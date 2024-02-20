import { ReactElement } from "react"

export type Email = {
  subject: string
  to: string
  react: ReactElement | null
}

export enum EmailTemplate {
  Dummy = "dummy",
  BlackFridaySale = "black-friday-sale",
}
