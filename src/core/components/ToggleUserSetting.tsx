import React from "react"
import { Checkbox } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import setUserSettings from "@/features/users/mutations/setUserSettings"

const ToggleUserSetting = ({ settings, setting, label }) => {
  const [$setUserSetting, { isLoading }] = useMutation(setUserSettings)

  return (
    <Checkbox
      disabled={isLoading}
      onClick={() =>
        $setUserSetting({
          key: setting,
          value: !settings?.[setting],
        })
      }
      checked={settings?.[setting]}
      label={label}
    />
  )
}

export default ToggleUserSetting
