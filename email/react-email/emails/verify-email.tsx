import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { emailStyles } from "../styles"

const defaultProps = {
  emailVerifyUrl: "https://example.com/verify-email",
}

export const EmailTemplateVerifyEmail: React.FC<{
  props: {
    emailVerifyUrl: string
  }
}> = ({ props = defaultProps }) => {
  const { emailVerifyUrl } = props
  return (
    <Html>
      <Head />
      <Preview>Welcome to template kit</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>
              Hello, you requested this email to verify your account. Please click the button below.
            </Text>
            <Button pX={10} pY={10} style={emailStyles.button} href={emailVerifyUrl}>
              Click here to verify your account
            </Button>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplateVerifyEmail
