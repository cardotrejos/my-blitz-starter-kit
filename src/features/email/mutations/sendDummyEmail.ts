import React from "react"
import { resolver } from "@blitzjs/rpc"
import db from "~/db"
import { z } from "zod"
import { generateUnsubscribeLink } from "@/utils/email-utils"
import { sendEmail } from "~/email/sendEmail"
import EmailTemplateDummy from "~/email/react-email/emails/dummy"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: { id: userId },
    })

    if (!user) throw new Error("User not found")

    let unsubscribeLink = await generateUnsubscribeLink({
      userId: user.id,
      userEmail: user.email,
    })

    await sendEmail({
      to: user.email,
      subject: "Unsubscribe",
      react: React.createElement(EmailTemplateDummy, {
        props: {
          name: user.name,
          unsubscribeLink,
        },
      }),
    })
  },
)
