import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next"
import { Horizontal, Vertical } from "mantine-layout-components"
import { AppShell, Modal, Header, Text, Footer, Anchor, Loader, Badge } from "@mantine/core"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { ReactFC } from "~/types"
import { RootErrorFallback } from "@/core/components/RootErrorFallback"
import { useRouter } from "next/router"
import { UserProfileProgress } from "@/core/components/Header/UserProfileProgress"
import { OnboardingWizard } from "@/core/components/OnboardingWizard"
import { openContextModal } from "@mantine/modals"
import { GlobalModal } from "@/modals"
import UserHeaderMenu from "@/core/components/Header/UserHeaderMenu"
import { DarkLightSwitch } from "@/core/components/DarkLightSwitch"

const Layout: ReactFC<{
  title?: string
}> = ({ title, children }) => {
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
                <Horizontal center>
                  <Horizontal center spacing="xs">
                    <Horizontal>
                      <UserHeaderMenu />
                      <UserProfileProgress />
                    </Horizontal>
                    <Badge
                      onClick={() => {
                        openContextModal({
                          modal: GlobalModal.becomePro,
                          title: "Become Pro",
                          innerProps: {},
                        })
                      }}
                      color="red"
                    >
                      Pro
                    </Badge>
                  </Horizontal>

                  <DarkLightSwitch />
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
              <Modal
                size="xl"
                centered={true}
                closeOnClickOutside={false}
                closeOnEscape={false}
                withCloseButton={false}
                title="Onboarding modal"
                opened={!!user && !user?.onboarded}
                onClose={() => {}}
              >
                <OnboardingWizard />
              </Modal>
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
