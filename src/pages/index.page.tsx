import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { UserInfo } from "../core/components/UserInfo"
import { AuthenticationForm } from "@/core/components/MainAuthenticationForm"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Vertical } from "mantine-layout-components"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()
  return (
    <Layout title="Home">
      {currentUser && <UserInfo />}
      {!currentUser && (
        <Vertical fullH fullW center>
          <AuthenticationForm />
        </Vertical>
      )}
    </Layout>
  )
}

export default Home
