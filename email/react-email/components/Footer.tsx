import React from "react"
import { Hr, Text } from "@react-email/components"
import { emailStyles } from "../styles"
import Link from "next/link"

export const Footer = ({ unsubscribeLink }: { unsubscribeLink?: string }) => {
  return (
    <>
      <Text style={emailStyles.paragraph}>— The New App team</Text>
      {unsubscribeLink && (
        <>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.footer}>
            Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080
            <Link href={unsubscribeLink} style={emailStyles.footer}>
              Unsubscribe
            </Link>
          </Text>
        </>
      )}
    </>
  )
}
