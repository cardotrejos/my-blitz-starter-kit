import Layout from "src/core/layouts/Layout"
import forgotPassword from "@/features/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { useForm, zodResolver } from "@mantine/form"
import { Button, TextInput, Title } from "@mantine/core"
import { Vertical } from "mantine-layout-components"
import { ForgotPasswordInput, ForgotPasswordInputType } from "@/features/auth/schemas"
import { notifications } from "@mantine/notifications"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const form = useForm<ForgotPasswordInputType>({
    initialValues: {
      email: "",
    },
    validate: zodResolver(ForgotPasswordInput),
  })
  let handleSubmit = async (values: { email: string } | undefined) => {
    await forgotPasswordMutation(values)
  }

  return (
    <Layout title="Forgot Your Password?">
      <Title order={3}>Forgot your password?</Title>

      {isSuccess && (
        <Vertical>
          <Title order={3}>Request Submitted</Title>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </Vertical>
      )}
      {!isSuccess && (
        <form
          onSubmit={form.onSubmit(async (values) => {
            await forgotPasswordMutation(values)
            notifications.show({
              color: "green",
              title: "Success",
              message:
                "If your email is in our system, you will receive instructions to reset your password shortly.",
            })
          })}
        >
          <Vertical>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="you@email.com"
              {...form.getInputProps("email")}
            />

            <Button type="submit">Login</Button>
          </Vertical>
        </form>
      )}
    </Layout>
  )
}

export default ForgotPasswordPage
