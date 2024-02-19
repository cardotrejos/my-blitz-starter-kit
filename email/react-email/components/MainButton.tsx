import React from "react"
import { Button, ButtonProps } from "@react-email/components"

export const MainButton = (props) => {
  return <Button pX={10} pY={10} style={button} {...props} />
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
