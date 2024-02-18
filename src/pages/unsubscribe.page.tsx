import React from "react"
import Layout from "@/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { Checkbox, Text } from "@mantine/core"
import { useStringQueryParam } from "@/utils/utils"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getUserEmailSettingsForUnsubscribe from "@/features/users/queries/getUserEmailSettingsForUnsubscribe"
import setUserEmailSetting from "@/features/users/mutations/setUserEmailSetting"

const ToggleUserSetting = ({ settings, setting, token, label }) => {
  const [$setUserSetting, { isLoading }] = useMutation(setUserEmailSetting)

  return (
    <Checkbox
      disabled={isLoading}
      onClick={() =>
        $setUserSetting({
          key: setting,
          value: !settings?.[setting],
          token,
        })
      }
      checked={settings?.[setting]}
      label={label}
    />
  )
}

export const UnsubscribePage: BlitzPage = () => {
  const token = useStringQueryParam("token")
  const [settings] = useQuery(getUserEmailSettingsForUnsubscribe, {
    token: token as string,
  })

  return (
    <Layout>
      <Vertical>
        <Text>Email Settings</Text>
      </Vertical>

      <Vertical>
        <ToggleUserSetting
          settings={settings}
          setting="settingsEmailMarketing"
          label="Marketing emails"
          token={token}
        />
        <ToggleUserSetting
          settings={settings}
          setting="settingsEmailProduct"
          label="Product updates"
          token={token}
        />
      </Vertical>
    </Layout>
  )
}

export default UnsubscribePage
