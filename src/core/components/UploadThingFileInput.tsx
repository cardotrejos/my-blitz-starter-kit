import { ReactFC } from "~/types"
import { UseFormReturnType } from "@mantine/form"
import { useBoolean } from "react-hanger"
import { useUploadThing } from "@/core/components/UploadThing"
import { showNotification } from "@mantine/notifications"
import { getUploadthingUrl } from "@/utils/image-utils"
import { Horizontal, Vertical } from "mantine-layout-components"
import { ActionIcon, FileInput, Image, Indicator, Loader, Text, Tooltip } from "@mantine/core"
import { IconPhoto, IconX } from "@tabler/icons-react"

export const UploadThingFileInput: ReactFC<{
  form: UseFormReturnType<any>
  name: string
  label: string
}> = ({ form, name, label }) => {
  const loading = useBoolean(false)

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (files) => {
      loading.setFalse()
      const fileKey = files?.[0]?.key
      if (fileKey) {
        form.setFieldValue(name, fileKey)
      }
    },
    onUploadError: () => {
      loading.setFalse()
      showNotification({
        message: "Image upload failed",
        color: "red",
        icon: <IconPhoto size={16} />,
      })
    },
  })

  const existingImageKey = form.values[name]

  return (
    <Vertical>
      <Horizontal spacing="xs" center>
        <Text size="sm" weight={500}>
          {label}
        </Text>
        {loading.value && <Loader size="xs" />}
      </Horizontal>

      {existingImageKey && (
        <Indicator
          color="none"
          label={
            <Tooltip color="dark" label="Clear image">
              <ActionIcon
                onClick={() => {
                  form.setFieldValue(name, "")
                }}
                size="xs"
                variant="light"
              >
                <IconX size={13} />
              </ActionIcon>
            </Tooltip>
          }
        >
          <Image radius="sm" width="60px" src={getUploadthingUrl(existingImageKey)} />
        </Indicator>
      )}

      {!existingImageKey && (
        <FileInput
          disabled={loading.value}
          onChange={(files) => {
            loading.setTrue()
            if (files) {
              startUpload([files])
            }
          }}
          clearable={true}
          placeholder={label}
          icon={<IconPhoto size={16} />}
        />
      )}
    </Vertical>
  )
}
