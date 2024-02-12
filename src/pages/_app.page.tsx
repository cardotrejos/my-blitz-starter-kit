import { AppProps, ErrorBoundary } from "@blitzjs/next"
import React, { Suspense, useState } from "react"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"
import { RootErrorFallback } from "@/core/components/RootErrorFallback"
import { ColorSchemeProvider, MantineProvider, ColorScheme } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import FullPageLoader from "@/core/components/FullPageLoader"
import { ModalsProvider } from "@mantine/modals"
import { globalModals } from "@/modals"
import { theme } from "@/styles/mantine-theme"
import { useLocalStorage } from "@mantine/hooks"

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  })

  const toogleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toogleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ ...theme, colorScheme }}>
        <ModalsProvider modals={globalModals}>
          <ErrorBoundary FallbackComponent={RootErrorFallback}>
            <Notifications position="top-right" />
            <Suspense fallback={<FullPageLoader />}>{<Component {...pageProps} />}</Suspense>
          </ErrorBoundary>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default withBlitz(MyApp)
