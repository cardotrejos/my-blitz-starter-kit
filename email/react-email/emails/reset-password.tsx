import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components"
import * as React from "react"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { emailStyles } from "../styles"
import { MainButton } from "../components/MainButton"

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
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>
              Hello, you requested this email to reset your password. Please click the button below.
            </Text>
            <MainButton pX={10} pY={10} style={emailStyles.button} href={resetPasswordUrl}>
              Click here to reset your password
            </MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplateResetPassword
