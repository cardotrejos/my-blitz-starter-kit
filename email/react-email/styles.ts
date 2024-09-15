const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}

const box = {
  padding: "0 48px",
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
  padding: "10px 20px",
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

export const emailStyles = {
  main,
  container,
  hr,
  box,
  paragraph,
  anchor,
  button,
  footer,
}
