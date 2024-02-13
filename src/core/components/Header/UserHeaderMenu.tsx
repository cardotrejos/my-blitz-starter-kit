import React from "react"
import { Vertical } from "mantine-layout-components"
import { Box, Button, Indicator, Menu, Text, Tooltip } from "@mantine/core"
import {
  IconSettings,
  IconTrash,
  IconUserShield,
  IconPencil,
  IconUser,
  IconLogout,
} from "@tabler/icons-react"
import { Conditional } from "@/utils/ConditionalWrap"
import { UserAvatar } from "@/core/components/UserAvatar"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { MenuItemIcon, MenuItemLink } from "@/core/components/MenuItems"
import { Routes } from "@blitzjs/next"
import { router } from "next/client"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import { useRouter } from "next/router"

const UserHeaderMenu = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  if (!user) return null

  return (
    <Vertical>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <div>
            <Conditional
              if={user.isAdmin}
              with={(children) => (
                <Indicator
                  color="none"
                  position="bottom-end"
                  label={
                    <Tooltip label="Admin" color="dark">
                      <Box>
                        <IconUserShield size={15} />
                      </Box>
                    </Tooltip>
                  }
                >
                  {children}
                </Indicator>
              )}
            >
              <UserAvatar user={user} />
            </Conditional>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Account</Menu.Label>
          <MenuItemIcon Icon={IconSettings} href={Routes.SettingsPage()} tooltip="Go to settings">
            Settings
          </MenuItemIcon>
          <MenuItemLink Icon={IconPencil} href={Routes.EditProfilePage()}>
            Edit profile
          </MenuItemLink>
          {user.username && (
            <MenuItemLink Icon={IconUser} href={Routes.ProfilePage({ username: user.username })}>
              Go to profile
            </MenuItemLink>
          )}

          <Menu.Divider />
          <MenuItemIcon
            color="red.4"
            Icon={IconLogout}
            onClick={async () => {
              await logoutMutation()
              router.push("/")
            }}
          >
            Logout
          </MenuItemIcon>
        </Menu.Dropdown>
      </Menu>
    </Vertical>
  )
}

export default UserHeaderMenu
