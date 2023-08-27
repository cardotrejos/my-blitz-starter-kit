import Layout from "src/core/layouts/Layout"
import { FORM_ERROR } from "src/core/components/Form"
import forgotPassword from "@/features/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { useForm } from "@mantine/form"
import { Button, TextInput } from "@mantine/core"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })
  let handleSubmit = async (values: { email: string } | undefined) => {
    await forgotPasswordMutation(values)
  }

  return (
    <Layout title="Forgot Your Password?">
      <h1>Forgot your password?</h1>

      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="you@email.com"
            {...form.getInputProps("email")}
          />

          <Button type="submit">Login</Button>
        </form>
      )}
    </Layout>
  )
}

export default ForgotPasswordPage
