import React from "react"
import { Vertical } from "mantine-layout-components"
import { Button, Card, PasswordInput, Title, Text } from "@mantine/core"
import { Form, useForm, zodResolver } from "@mantine/form"
import { ChangePasswordInput, ChangePasswordInputType } from "@/features/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import changePasswordForLoggedIn from "@/features/auth/mutations/changePasswordForLoggedIn"

export const ChangePassword = () => {
  const [$changePasswordForLoggedIn, { isLoading, isSuccess }] =
    useMutation(changePasswordForLoggedIn)

  const form = useForm<ChangePasswordInputType>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(ChangePasswordInput),
  })

  return (
    <Card withBorder w="100%" maw={300}>
      {isSuccess && (
        <Vertical>
          <Text>Password Changed!</Text>
        </Vertical>
      )}
      {!isSuccess && (
        <Vertical fullW>
          <Title order={4}>Change Password</Title>
          <Vertical fullW>
            <Form
              style={{
                width: "100%",
              }}
              form={form}
              onSubmit={async (values) => {
                await $changePasswordForLoggedIn(values)
              }}
            >
              <Vertical fullW>
                <PasswordInput
                  w="100%"
                  withAsterisk
                  label="New password"
                  {...form.getInputProps("currentPassword")}
                />
                <PasswordInput
                  w="100%"
                  withAsterisk
                  label="New password"
                  {...form.getInputProps("newPassword")}
                />
                <PasswordInput
                  w="100%"
                  withAsterisk
                  label="New password Confirmation"
                  {...form.getInputProps("newPasswordConfirmation")}
                />
                <Button loading={isLoading} disabled={!form.isValid()} type="submit">
                  Submit
                </Button>
              </Vertical>
            </Form>
          </Vertical>
        </Vertical>
      )}
    </Card>
  )
}
