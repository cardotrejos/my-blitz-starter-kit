import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Horizontal, Vertical } from "mantine-layout-components"
import { AppShell, Modal, Navbar, Header, Text, Footer, Anchor } from "@mantine/core"
import Link from "next/link"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const thisYear = new Date().getFullYear()

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
            <Horizontal fullH>
              <Anchor href={Routes.Home()} color="gray3" component={Link} fw="bold">
                My Blitz Starter Kit
              </Anchor>
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
          <Suspense fallback="Loading...">{children}</Suspense>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
