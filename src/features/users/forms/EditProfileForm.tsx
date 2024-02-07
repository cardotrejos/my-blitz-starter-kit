import React from "react"
import { Routes } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { Button, Text, Textarea, TextInput } from "@mantine/core"
import { Form, UseFormReturnType } from "@mantine/form"
import { notifications, showNotification } from "@mantine/notifications"
import { router } from "next/client"
import { ReactFC } from "~/types"
import { UpdateProfileInputType } from "@/features/users/schemas"
import { UploadButton } from "@/utils/uploadthing"

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
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            //const fileKey = res?.[0]?.key

            console.log("Files: ", res)
            notifications.show({
              color: "green",
              title: "Success",
              message: "File uploaded!",
            })
            //form.setFieldValue("avatarImageKey", fileKey)
          }}
          onUploadError={(error: Error) => {
            console.log("Error: ", error.message)
            // Do something with the error.
            alert(`ERROR! ${error.message}`)
            notifications.show({
              color: "red",
              title: "Error",
              message: error.message,
            })
          }}
        />
        <Button loading={isSubmitting} type="submit">
          Save
        </Button>
      </Vertical>
    </Form>
  )
}

export default EditProfileForm
