import { Email } from "~/email/types"
import { sendEmail } from "~/email/sendEmail"
import { isDev } from "@/config"
import { EMAIL_DEFAULT_FROM, resend } from "~/email/resend"

type EmailWithText = Email & {
  text: string
  from: string
}

export const sendBulkEmail = async ({ emails }: { emails: Email[] }) => {
  if (isDev) {
    for (const email of emails) {
      await sendEmail(email)
    }
  } else {
    let mappedEmails: EmailWithText[] = emails.map((email) => ({
      ...email,
      from: EMAIL_DEFAULT_FROM,
      text: "",
    }))

    const maxEmailLimit = 100

    if (mappedEmails.length > maxEmailLimit) {
      throw new Error(`Can't send more than ${maxEmailLimit} emails at once using Resend`)
    }

    return resend.batch.send(mappedEmails)
  }
}
