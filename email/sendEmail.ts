import React from "react"
import { Resend } from "resend"
import { isDev } from "@/config"
import { CreateEmailOptions } from "resend/build/src/emails/interfaces"
import EmailTemplateWelcome from "~/email/react-email/emails/welcome"
import { nodemailerAppTransport } from "~/email/transports/nodemailer-local-app-transport"
import { render } from "@react-email/render"
import { env } from "@/env.mjs"

const resend = new Resend(env.RESEND_API_KEY)

export const sendEmail = async ({ subject, to, react }) => {
  let message: CreateEmailOptions = {
    from: "onboarding@resend.dev",
    to,
    subject,
    react,
  }

  if (isDev) {
    const html = render(react)
    return nodemailerAppTransport.sendMail({
      ...message,
      html,
    })
  }

  return resend.emails.send({ ...message, react })
}
