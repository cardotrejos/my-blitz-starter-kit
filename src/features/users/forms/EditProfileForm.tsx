import React from "react"
import { Routes } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { Button, Text, Textarea, TextInput } from "@mantine/core"
import { Form, UseFormReturnType } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { router } from "next/client"
import { ReactFC } from "~/types"
import { UpdateProfileInputType } from "@/features/users/schemas"

export const EditProfileForm: ReactFC<{
  form: UseFormReturnType<UpdateProfileInputType>
  onSubmit: (values: UpdateProfileInputType) => Promise<void>
  isSubmitting: boolean
}> = ({ onSubmit, form, isSubmitting }) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Vertical fullW>
        <TextInput
          w="100%"
          required
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
          radius="md"
        />
        <TextInput
          w="100%"
          required
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
          radius="md"
        />
        <Textarea
          w="100%"
          required
          label="Bio"
          placeholder="Bio"
          {...form.getInputProps("bio")}
          radius="md"
        />
        <Button loading={isSubmitting} type="submit">
          Save
        </Button>
      </Vertical>
    </Form>
  )
}

export default EditProfileForm
