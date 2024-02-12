import { ActionIcon, useMantineColorScheme } from "@mantine/core"
import { IconSun, IconMoonStars } from "@tabler/icons-react"

export const DarkLightSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const isDark = colorScheme === "dark"

  return (
    <ActionIcon
      variant="outline"
      color={isDark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {isDark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
    </ActionIcon>
  )
}
