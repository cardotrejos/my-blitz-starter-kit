import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { UserInfo } from "../core/components/UserInfo"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <UserInfo />
    </Layout>
  )
}

export default Home
