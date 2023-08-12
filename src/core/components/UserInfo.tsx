import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Button } from "@mantine/core"

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Button component={Link} href={Routes.SignupPage()}>
          Sign Up
        </Button>
        <Button component={Link} href={Routes.LoginPage()}>
          Login
        </Button>
      </>
    )
  }
}
