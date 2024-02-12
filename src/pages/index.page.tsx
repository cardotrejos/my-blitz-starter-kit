import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { UserInfo } from "@/core/components/UserInfo"
import { MainAuthenticationForm } from "@/core/components/MainAuthenticationForm"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Button } from "@mantine/core"
import { modals, openContextModal } from "@mantine/modals"
import { GlobalModal } from "@/modals"
import { confirmDelete } from "@/utils/mantine-utils"

const Home: BlitzPage = () => {
  const user = useCurrentUser()

  const deleteAccountMutation = () => {
    console.log("delete account")
  }

  return (
    <Layout title="Home">
      {user && <UserInfo />}
      {!user && <MainAuthenticationForm />}
      <Button
        onClick={() => {
          confirmDelete(
            () => {
              deleteAccountMutation()
            },
            {
              confirmLabel: "Delete Account",
            },
          )
        }}
      >
        Become Pro
      </Button>
    </Layout>
  )
}

export default Home
