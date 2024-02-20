import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { emailStyles } from "../styles"
import EmailTemplateWelcome from "~/email/react-email/emails/welcome"
import EmailTemplateDummy from "~/email/react-email/emails/dummy"
import { MainButton } from "~/email/react-email/components/MainButton"

const defaultProps = {
  name: "Test User",
  unsubscribeLink: "",
  title: "Black Friday savings",
  mainButtonText: "Shop now",
  text: "Shop now",
}

export const EmailTemplateBlackFridaySale: React.FC<{
  props: {
    name?: string | null
    unsubscribeLink?: string
    title?: string
    mainButtonText?: string
    text?: string
  }
}> = ({ props = defaultProps }) => {
  const { unsubscribeLink, text, title, mainButtonText } = props

  return (
    <Html>
      <Head />
      <Preview>Black friday sales</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>{title}</Text>
            <Text
              dangerouslySetInnerHTML={{
                __html: text!.replace(/\n/g, "<br/>"),
              }}
            />
            <MainButton href="https://dashboard.stripe.com/login">{mainButtonText}</MainButton>
            <Footer unsubscribeLink={unsubscribeLink} />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplateBlackFridaySale
