import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Routes } from "@blitzjs/next"
import { List, RingProgress, Tooltip, Text } from "@mantine/core"
import Link from "next/link"
import { Vertical } from "mantine-layout-components"

export const UserProfileProgress = () => {
  const user = useCurrentUser()

  if (!user) return null

  const keys = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "bio",
      label: "Bio",
    },
    {
      key: "avatarImageKey",
      label: "Profile picture",
    },
  ]

  const existingKeys = keys.filter(({ key }) => user[key])

  const missingKeys = keys.filter(({ key }) => !user[key])

  const completionPercentage = Math.round((existingKeys.length / keys.length) * 100)

  if (completionPercentage === 100) return null

  return (
    <Link href={Routes.EditProfilePage()}>
      <Tooltip
        color="dark"
        label={
          <Vertical spacing="xs">
            <Text fw="bold">Profile Progress ({completionPercentage}%)</Text>
            <Vertical spacing={0}>
              <Text>Missing:</Text>
              <List>
                {missingKeys.map(({ label }) => (
                  <List.Item key={label}>{label}</List.Item>
                ))}
              </List>
            </Vertical>
          </Vertical>
        }
      >
        <RingProgress
          size={25}
          thickness={4}
          roundCaps
          sections={[{ value: completionPercentage, color: "red" }]}
        />
      </Tooltip>
    </Link>
  )
}
