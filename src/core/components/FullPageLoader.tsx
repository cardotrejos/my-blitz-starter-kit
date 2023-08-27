import React from "react"
import { Vertical } from "mantine-layout-components"
import { Loader } from "@mantine/core"

const FullPageLoader = () => {
  return (
    <Vertical mih="100vh" miw="100vw">
      <Loader />
    </Vertical>
  )
}

export default FullPageLoader
