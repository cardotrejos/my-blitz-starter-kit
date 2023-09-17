import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm, zodResolver } from "@mantine/form"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import login from "@/features/auth/mutations/login"
import { Vertical } from "mantine-layout-components"
import { LoginInput, LoginInputType } from "@/features/auth/schemas"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import SocialButtonsAuth from "@/core/components/MainAuthenticationForm/SocialButtonsAuth"
import { PromiseReturnType } from "blitz"
import { ReactFC } from "~/types"

export const LoginForm: ReactFC<{
  toggle: () => void
}> = ({ toggle }) => {
  const [$login, { isLoading }] = useMutation(login)

  const form = useForm<LoginInputType>({
    validate: zodResolver(LoginInput),
    validateInputOnBlur: true,
  })

  return (
    <Vertical mih="100vh" fullH fullW center>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Welcome to My App , login with
        </Text>

        <SocialButtonsAuth />

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit((values) => {
            $login(values)
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />
            <Vertical fullW spacing="3px">
              <PasswordInput
                w="100%"
                required
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
                radius="md"
              />
              <Text
                fz="xs"
                color="dimmed"
                sx={{
                  alignSelf: "flex-end",
                }}
                component={Link}
                href={Routes.ForgotPasswordPage()}
              >
                Forgot password?
              </Text>
            </Vertical>
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="dimmed" size="xs" onClick={toggle}>
              Don't have an account? Register
            </Anchor>
            <Button disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  )
}
