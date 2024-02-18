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

const defaultProps = {
  name: "Test User",
}

export const EmailTemplateWelcome: React.FC<{
  props: {
    name?: string | null
    emailVerifyUrl: string
  }
}> = ({ props = defaultProps }) => {
  const { name } = props
  const welcomeMessage = name ? `Hello there ${name}` : "Hello,"
  return (
    <Html>
      <Head />
      <Preview>Welcome to MyApp</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>{welcomeMessage} welcome to our platform!</Text>
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
              Click here to get started
            </Button>
            <Hr style={emailStyles.hr} />
            <Text style={emailStyles.paragraph}>
              If you haven't finished your integration, you might find our{" "}
              <Link style={emailStyles.anchor} href="https://stripe.com/docs">
                docs
              </Link>{" "}
              handy.
            </Text>
            <Text style={emailStyles.paragraph}>
              Once you're ready to start accepting payments, you'll just need to use your live{" "}
              <Link
                style={emailStyles.anchor}
                href="https://dashboard.stripe.com/login?redirect=%2Fapikeys"
              >
                API keys
              </Link>{" "}
              instead of your test API keys. Your account can simultaneously be used for both test
              and live requests, so you can continue testing while accepting live payments. Check
              out our{" "}
              <Link style={emailStyles.anchor} href="https://stripe.com/docs/dashboard">
                tutorial about account basics
              </Link>
              .
            </Text>
            <Text style={emailStyles.paragraph}>
              Finally, we've put together a{" "}
              <Link style={emailStyles.anchor} href="https://stripe.com/docs/checklist/website">
                quick checklist
              </Link>{" "}
              to ensure your website conforms to card network standards.
            </Text>
            <Text style={emailStyles.paragraph}>
              We'll be here to help you with any step along the way. You can find answers to most
              questions and get in touch with us on our{" "}
              <Link style={emailStyles.anchor} href="https://support.stripe.com/">
                support site
              </Link>
              .
            </Text>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplateWelcome
