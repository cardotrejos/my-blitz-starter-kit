import React from "react"
import { Horizontal, Vertical } from "mantine-layout-components"
import {
  Button,
  FileInput,
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
import { showNotification } from "@mantine/notifications"
import { ReactFC } from "~/types"
import { UpdateProfileInputType } from "@/features/users/schemas"
import { IconPhoto, IconX } from "@tabler/icons-react"
import { useUploadThing } from "@/core/components/UploadThing"
import { useBoolean } from "react-hanger"
import { getUploadthingUrl } from "@/utils/image-utils"

export const EditProfileForm: ReactFC<{
  form: UseFormReturnType<UpdateProfileInputType>
  onSubmit: (values: UpdateProfileInputType) => Promise<void>
  isSubmitting: boolean
}> = ({ onSubmit, form, isSubmitting }) => {
  const loading = useBoolean(false)
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (files) => {
      loading.setFalse()
      showNotification({
        message: "Image uploaded!",
        color: "teal",
        icon: <IconPhoto size={16} />,
      })
      const fileKey = files?.[0]?.key
      if (fileKey) {
        form.setFieldValue("avatarImageKey", fileKey)
      }
    },
    onUploadError: () => {
      loading.setFalse()
      showNotification({
        message: "Error uploading image",
        color: "red",
        icon: <IconPhoto size={16} />,
      })
    },
  })

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
        <Vertical>
          <Horizontal center>
            <Text size="sm" weight={500}>
              Profile picture
            </Text>
            {loading.value && <Loader size="xs" />}
          </Horizontal>
          {existingAvatarImageKey && (
            <Indicator
              color="none"
              label={
                <Tooltip color="dark" label={"Clear image"}>
                  <ActionIcon
                    onClick={() => {
                      form.setFieldValue("avatarImageKey", "")
                    }}
                    size="xs"
                    variant="light"
                  >
                    <IconX size={13} />
                  </ActionIcon>
                </Tooltip>
              }
            >
              <Image width="60px" src={getUploadthingUrl(existingAvatarImageKey)} />
            </Indicator>
          )}
          {!existingAvatarImageKey && (
            <FileInput
              disabled={loading.value}
              onChange={(files) => {
                loading.setTrue()
                if (files) {
                  startUpload([files])
                }
              }}
              placeholder="Profile picture"
              icon={<IconPhoto size={16} />}
              clearable={true}
            />
          )}
        </Vertical>
        <Button loading={isSubmitting} type="submit">
          Save
        </Button>
      </Vertical>
    </Form>
  )
}

export default EditProfileForm
