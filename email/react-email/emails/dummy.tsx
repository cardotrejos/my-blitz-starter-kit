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

const defaultProps = {
  name: "Test User",
  emailVerifyUrl: "Test User",
  unsubscribeLink: "",
}

export const EmailTemplateDummy: React.FC<{
  props: {
    name?: string | null
    emailVerifyUrl: string
    unsubscribeLink: string
  }
}> = ({ props = defaultProps }) => {
  const { name, unsubscribeLink } = props

  return (
    <Html>
      <Head />
      <Preview>Welcome to MyApp</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>Dummy email</Text>
            <Text style={emailStyles.paragraph}>
              You can view your payments and a variety of other information about your account right
              from your dashboard.
            </Text>
            <Button
              pX={10}
              pY={10}
              style={emailStyles.button}
              href="https://dashboard.stripe.com/login"
            >
              Dummy button
            </Button>
            <Footer unsubscribeLink={unsubscribeLink} />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplateDummy
