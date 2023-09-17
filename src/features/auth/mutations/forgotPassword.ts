import { generateToken, hash256 } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "../../../../db"
import { ForgotPasswordInput } from "@/features/auth/schemas"
import { regenerateToken } from "@/utils/blitz-utils"
import { TokenType } from "@prisma/client"
import { sendEmail } from "~/email/sendEmail"
import { APP_ORIGIN } from "@/config"
import EmailTemplateResetPassword from "~/email/react-email/emails/reset-password"
import React from "react"

export default resolver.pipe(resolver.zod(ForgotPasswordInput), async ({ email }) => {
  const user = await db.user.findFirst({ where: { email: email.toLowerCase() } })

  if (!user) {
    await new Promise((resolve) => setTimeout(resolve, 750))
    return true
  }

  const token = await regenerateToken({
    tokenType: TokenType.RESET_PASSWORD,
    userId: user.id,
    userEmail: user.email,
  })

  let resetPasswordUrl = `${APP_ORIGIN}/auth/reset-password?token=${token}`

  await sendEmail({
    to: user.email,
    subject: "Reset your password for YourAppName",
    react: React.createElement(EmailTemplateResetPassword, { props: { resetPasswordUrl } }),
  })

  return true
})
