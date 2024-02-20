import React from "react"
import { resolver } from "@blitzjs/rpc"
import db from "~/db"
import { z } from "zod"
import { generateUnsubscribeLink } from "@/utils/email-utils"
import { EmailList, VariableType } from "@/features/email/types"
import { chunk, convertArrayToObject } from "@/utils/utils"
import { isDev } from "@/config"
import { Email, EmailTemplate } from "~/email/types"
import { sendBulkEmail } from "~/email/sendBulkEmail"
import { emailTemplates } from "@/features/email/templates"
import { remapVariables } from "@/features/email/utils"
import { react } from "@babel/types"

const Input = z.object({
  list: z.nativeEnum(EmailList),
  template: z.nativeEnum(EmailTemplate),
  subject: z.string(),
  variables: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    }),
  ),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ list, subject, template, variables }, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: { id: userId },
    })

    if (!user) throw new Error("User not found")

    const foundEmailTemplate = emailTemplates.find((e) => e.value === template)

    if (!foundEmailTemplate) throw new Error("Template not found")

    const users = await db.user.findMany({
      where: {
        AND: [
          {
            ...(list === EmailList.Product && {
              settingsEmailMarketing: true,
            }),
            ...(list === EmailList.Marketing && {
              settingsEmailProduct: true,
            }),
          },
          {
            id: {
              not: user.id,
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        avatarImageKey: true,
      },
    })

    let CHUNK_SIZE = isDev ? 3 : 100
    const chunks = chunk(users, CHUNK_SIZE)

    for (const chunk of chunks) {
      const emails: Email[] = await Promise.all(
        chunk.map(async (user): Promise<Email> => {
          const specialVariables = {
            userName: user.name,
            userEmail: user.email,
            userId: user.id,
            avatarImageKey: user.avatarImageKey,
            userUsername: user.username,
          }

          let replacedSubject = subject

          for (const key in specialVariables) {
            replacedSubject = replacedSubject.replace(`{{${key}}}`, specialVariables[key])
          }

          const remappedVariables = remapVariables({
            variables,
            specialVariables,
          })

          let unsubscribeLink = await generateUnsubscribeLink({
            userId: user.id,
            userEmail: user.email,
          })

          return {
            to: user.email,
            subject: replacedSubject,
            react: React.createElement(foundEmailTemplate.component, {
              props: {
                name: user.name,
                unsubscribeLink,
                ...convertArrayToObject(remappedVariables),
              },
            }),
          }
        }),
      )

      await sendBulkEmail({ emails })
    }
  },
)
