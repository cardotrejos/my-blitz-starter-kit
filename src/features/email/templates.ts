import { EmailTemplate } from "~/email/types"
import EmailTemplateDummy from "~/email/react-email/emails/dummy"
import EmailTemplateWelcome from "~/email/react-email/emails/welcome"
import EmailTemplateBlackFridaySale from "~/email/react-email/emails/black-friday-sale"

export const emailTemplates = [
  {
    name: "Dummy",
    value: EmailTemplate.Dummy,
    component: EmailTemplateDummy,
  },
  {
    name: "Black Friday Sale",
    value: EmailTemplate.BlackFridaySale,
    component: EmailTemplateBlackFridaySale,
  },
]
