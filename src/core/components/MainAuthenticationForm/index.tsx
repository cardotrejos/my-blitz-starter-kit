import { useToggle } from "@mantine/hooks"
import { LoginForm } from "@/core/components/MainAuthenticationForm/LoginForm"
import { SignupForm } from "@/core/components/MainAuthenticationForm/SignupForm"

export function MainAuthenticationForm() {
  const [type, toggle] = useToggle(["login", "register"])

  return (
    <>
      {type === "login" && <LoginForm toggle={toggle} />}
      {type === "register" && <SignupForm toggle={toggle} />}
    </>
  )
}
