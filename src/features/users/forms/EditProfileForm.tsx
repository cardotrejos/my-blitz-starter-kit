import React from "react"
import { Horizontal, Vertical } from "mantine-layout-components"
import {
  Button,
  Loader,
  Text,
  Textarea,
  Image,
  TextInput,
  Indicator,
  Tooltip,
  ActionIcon,
} from "@mantine/core"
import { Form, UseFormReturnType } from "@mantine/form"
import { ReactFC } from "~/types"
import { UpdateProfileInputType } from "@/features/users/schemas"
import { IconX } from "@tabler/icons-react"
import { useBoolean } from "react-hanger"
import { getUploadthingUrl } from "@/utils/image-utils"
import { UploadThingFileInput } from "@/core/components/UploadThingFileInput"

export const EditProfileForm: ReactFC<{
  form: UseFormReturnType<UpdateProfileInputType>
  onSubmit: (values: UpdateProfileInputType) => Promise<void>
  isSubmitting: boolean
}> = ({ onSubmit, form, isSubmitting }) => {
  const loading = useBoolean(false)

  const existingAvatarImageKey = form.values.avatarImageKey

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

        <UploadThingFileInput form={form} name="avatarImageKey" label="Profile picture" />

        <Button loading={isSubmitting} type="submit">
          Save
        </Button>
      </Vertical>
    </Form>
  )
}

export default EditProfileForm
