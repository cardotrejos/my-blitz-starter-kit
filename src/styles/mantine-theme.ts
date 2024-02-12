import { MantineThemeOverride } from "@mantine/core"

// https://v6.mantine.dev/theming/mantine-provider/

const ButtonDefaultProps = {
  size: "md",
  variant: "light",
}

export const theme: MantineThemeOverride = {
  colorScheme: "dark",
  loader: "bars",
  cursorType: "pointer",
  components: {
    Button: {
      defaultProps: ButtonDefaultProps,
      variants: {
        danger: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[9],
            color: theme.colors.red[0],
            ...theme.fn.hover({ backgroundColor: theme.colors.red[8] }),
          },
        }),

        success: (theme) => ({
          root: {
            backgroundImage: theme.fn.linearGradient(
              45,
              theme.colors.cyan[theme.fn.primaryShade()],
              theme.colors.teal[theme.fn.primaryShade()],
              theme.colors.green[theme.fn.primaryShade()],
            ),
            color: theme.white,
          },
        }),
      },
    },
  },
  colors: {
    "ocean-blue": [
      "#7AD1DD",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
    "bright-pink": [
      "#F0BBDD",
      "#ED9BCF",
      "#EC7CC3",
      "#ED5DB8",
      "#F13EAF",
      "#F71FA7",
      "#FF00A1",
      "#E00890",
      "#C50E82",
      "#AD1374",
    ],
  },
  // defaultGradient: {
  //   from: "indigo",
  //   to: "cyan",
  //   deg: 45, },
}
