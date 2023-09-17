import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"
import EmailTemplateWelcome from "~/email/react-email/emails/welcome"
import EmailTemplateVerifyEmail from "~/email/react-email/emails/verify-email"

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

const defaultProps = {
  resetPasswordUrl: "https://localhost:3000",
}

export const EmailTemplateResetPassword: React.FC<{
  props: {
    resetPasswordUrl: string
  }
}> = ({ props = defaultProps }) => {
  const { resetPasswordUrl } = props
  return (
    <Html>
      <Head />
      <Preview>Reset password for YourNameApp</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img src={`${baseUrl}/images/logo.png`} width="49" height="21" alt="Stripe" />
            <Hr style={hr} />
            <Text style={paragraph}>
              Hello, you requested this email to reset your password. Please click the button below.
            </Text>
            <Button pX={10} pY={10} style={button} href={resetPasswordUrl}>
              Click here to verify your account
            </Button>
            <Text style={paragraph}>— The Company team</Text>
            <Hr style={hr} />
            <Text style={footer}>Template Company, Somewhere in Colombia</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplateResetPassword

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}

const box = {
  padding: "0 48px",
}

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
}

const anchor = {
  color: "#556cd6",
}

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
}
