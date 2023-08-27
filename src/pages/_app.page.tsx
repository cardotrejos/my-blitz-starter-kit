import { AppProps, ErrorBoundary } from "@blitzjs/next"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"
import { RootErrorFallback } from "@/core/components/RootErrorFallback"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import FullPageLoader from "@/core/components/FullPageLoader"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Notifications position="top-right" />
        <Suspense fallback={<FullPageLoader />}>{<Component {...pageProps} />}</Suspense>
      </ErrorBoundary>
    </MantineProvider>
  )
}

export default withBlitz(MyApp)
