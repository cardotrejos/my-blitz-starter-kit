import React from "react"
import { Vertical } from "mantine-layout-components"
import { useQuery } from "@blitzjs/rpc"
import getUserEmailSettings from "@/features/users/queries/getUserEmailSettings"
import ToggleUserSetting from "@/core/components/ToggleUserSetting"
import { ReactFC } from "~/types"

export const UserEmailSettings: ReactFC<{}> = () => {
  const [settings] = useQuery(getUserEmailSettings, {})

  return (
    <Vertical>
      <ToggleUserSetting
        settings={settings}
        setting="settingsEmailMarketing"
        label="Marketing emails"
      />
      <ToggleUserSetting
        settings={settings}
        setting="settingsEmailProduct"
        label="Product emails"
      />
    </Vertical>
  )
}

export default UserEmailSettings
