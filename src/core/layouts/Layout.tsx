import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next"
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
  Tooltip,
} from "@mantine/core"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { ReactFC } from "~/types"
import { IconUserShield } from "@tabler/icons-react"
import { RootErrorFallback } from "@/core/components/RootErrorFallback"
import { useRouter } from "next/router"
import { Conditional } from "@/utils/ConditionalWrap"

const Layout: ReactFC<{
  title?: string
}> = ({ title, children }) => {
  const [logoutMutation] = useMutation(logout)
  const thisYear = new Date().getFullYear()
  const user = useCurrentUser()

  const router = useRouter()

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
                <Horizontal center>
                  <Horizontal center spacing="xs">
                    <Conditional
                      if={!!user.username}
                      with={(children) => {
                        return (
                          <Link
                            href={Routes.ProfilePage({
                              username: user.username as string,
                            })}
                          >
                            {children}
                          </Link>
                        )
                      }}
                    >
                      <Text>{user.name}</Text>
                    </Conditional>
                    {user.isAdmin && (
                      <Tooltip label="Admin" position="bottom">
                        <IconUserShield size={15} />
                      </Tooltip>
                    )}
                  </Horizontal>
                  <Button
                    onClick={async () => {
                      await logoutMutation()
                      router.push("/")
                    }}
                    size="xs"
                    variant="light"
                  >
                    Logout
                  </Button>
                </Horizontal>
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
          <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
            <Suspense
              fallback={
                <Vertical fullW fullH center>
                  <Loader />
                </Vertical>
              }
            >
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
