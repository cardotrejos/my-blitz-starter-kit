import React from "react"
import Layout from "@/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { Text } from "@mantine/core"
import { useStringQueryParam } from "@/utils/utils"
import { useQuery } from "@blitzjs/rpc"
import verifyEmailToken from "@/features/auth/queries/verifyEmailToken"

export const VerifyEmailPage: BlitzPage = () => {
  const token = useStringQueryParam("token")

  const [result, { isSuccess, error }] = useQuery(
    verifyEmailToken,
    {
      token: token as any,
    },
    {
      enabled: !!token,
    },
  )

  return (
    <Layout>
      <Vertical>
        <>
          {result && isSuccess && <Text>Email verified!</Text>}
          {error && <Text>Invalid Token</Text>}
        </>
      </Vertical>
    </Layout>
  )
}

export default VerifyEmailPage
