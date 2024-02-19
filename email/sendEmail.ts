import { isDev } from "@/config"
import { nodemailerAppTransport } from "~/email/transports/nodemailer-local-app-transport"
import { render } from "@react-email/render"
import { Email } from "./types"
import { resend } from "~/email/resend"

export const sendEmail = async ({ subject, to, react }: Email) => {
  let message = {
    from: "onboarding@resend.dev",
    to,
    subject,
    text: "",
  }

  if (isDev) {
    if (!react) throw new Error("The email doesn't have any content")
    const html = render(react)
    return nodemailerAppTransport.sendMail({
      ...message,
      html,
    })
  }

  return resend.emails.send({ ...message, react })
}
