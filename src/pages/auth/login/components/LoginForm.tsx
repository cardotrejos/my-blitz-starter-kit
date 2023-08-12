import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import login from "@/features/auth/mutations/login"
import { Login } from "@/features/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useForm } from "@mantine/form"
import { Button, PasswordInput, TextInput } from "@mantine/core"
import { Vertical } from "mantine-layout-components"
import { FORM_ERROR } from "@/core/components/Form"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const onSubmit = async (values) => {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return {
          [FORM_ERROR]: "Sorry, those credentials are invalid",
        }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  return (
    <Vertical>
      <h1>Login</h1>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="you@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Password"
          type="password"
          {...form.getInputProps("password")}
        />
        <Button type="submit">Login</Button>
      </form>

      <div>
        <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
      </div>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href={Routes.SignupPage()}>Sign Up</Link>
      </div>
    </Vertical>
  )
}

export default LoginForm
