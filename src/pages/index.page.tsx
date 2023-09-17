import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { UserInfo } from "@/core/components/UserInfo"
import { MainAuthenticationForm } from "@/core/components/MainAuthenticationForm"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"

const Home: BlitzPage = () => {
  const user = useCurrentUser()
  return (
    <Layout title="Home">
      {user && <UserInfo />}
      {!user && <MainAuthenticationForm />}
    </Layout>
  )
}

export default Home
