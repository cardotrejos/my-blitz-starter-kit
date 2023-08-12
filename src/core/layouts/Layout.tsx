import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Horizontal, Vertical } from "mantine-layout-components"
import {
  AppShell,
  Modal,
  Navbar,
  Header,
  Text,
  Footer,
  Anchor,
  Button,
  Loader,
} from "@mantine/core"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [logoutMutation] = useMutation(logout)
  const thisYear = new Date().getFullYear()

  const user = useCurrentUser()

  return (
    <>
      <Head>
        <title>{title || "my-blitz-starter-kit"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        padding="md"
        /*navbar={
          <Navbar width={{ base: 300 }} height={500} p="xs">
            {/!* Navbar content *!/}
          </Navbar>
        }*/
        header={
          <Header height={60} p="xs">
            <Horizontal fullH spaceBetween>
              <Anchor
                underline={false}
                href={Routes.Home()}
                color="gray.3"
                component={Link}
                fw="bold"
              >
                My Blitz Starter Kit
              </Anchor>
              {user && (
                <Button
                  onClick={async () => {
                    await logoutMutation()
                  }}
                  size="xs"
                  variant="light"
                >
                  Logout
                </Button>
              )}
            </Horizontal>
          </Header>
        }
        footer={
          <Footer height={40}>
            <Horizontal fullH fullW center>
              <Text fz="xs" color="dimmed">
                Copyright {thisYear}
              </Text>
            </Horizontal>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <Vertical fullW fullH>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
