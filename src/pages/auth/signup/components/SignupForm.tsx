import signup from "@/features/auth/mutations/signup"
import { Signup } from "@/features/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Vertical } from "mantine-layout-components"
import { Button, PasswordInput, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { FORM_ERROR } from "@/core/components/Form"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  let onSubmit = async (values) => {
    try {
      await signupMutation(values)
      props.onSuccess?.()
    } catch (error: any) {
      if (error.name === "P2002" && error.meta?.target?.includes("email")) {
        return {
          email: "This email is already being used",
        }
      } else {
        return {
          [FORM_ERROR]: error.toString(),
        }
      }
    }
  }

  return (
    <Vertical>
      <Title>Create an Account</Title>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="you@email.com"
          {...form.getInputProps("email")}
        />

        <TextInput
          withAsterisk
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Password"
          type="password"
          {...form.getInputProps("password")}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Vertical>
  )
}

export default SignupForm
