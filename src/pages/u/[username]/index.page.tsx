import React from "react"
import Layout from "@/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { Alert, Button, Modal, Text } from "@mantine/core"
import { useStringParam } from "@/utils/utils"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getUserForProfile from "@/features/users/queries/getUserForProfile"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { useForm, zodResolver } from "@mantine/form"
import updateProfile from "@/features/users/mutations/updateProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "@/features/users/schemas"
import { notifications, showNotification } from "@mantine/notifications"
import { useRouter } from "next/router"
import { EditProfileForm } from "@/features/users/forms/EditProfileForm"
import { IconAlertCircle } from "@tabler/icons-react"
import requestVerificationEmail from "@/features/auth/mutations/requestVerificationEmail"
import { UploadButton } from "@/core/components/UploadThing"

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username")
  const [user] = useQuery(
    getUserForProfile,
    { username: username || "" },
    {
      enabled: !!username,
    },
  )

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      avatarImageKey: user?.avatarImageKey || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  const [$updateProfile, { isLoading }] = useMutation(updateProfile)

  const [$requestVerificationEmail, { isLoading: isSendingEmail, isSuccess }] =
    useMutation(requestVerificationEmail)

  const [opened, { open, close }] = useDisclosure(false)

  const currentUser = useCurrentUser()

  const router = useRouter()

  const isOwner = currentUser?.id === user?.id

  if (!user) {
    return (
      <Text>
        User with username <b>{username}</b> not found.
      </Text>
    )
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close()
          form.reset()
        }}
        title="Edit Profile"
      >
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values)
            const { username } = values
            if (username !== user.username) {
              if (username) {
                router.push(Routes.ProfilePage({ username }))
              }
            }
            showNotification({ color: "green", title: "Success", message: "Profile updated!" })
            close()
          }}
          isSubmitting={isLoading}
        />
      </Modal>
      <Layout>
        <Vertical>
          {isOwner && !currentUser?.emailVerified && (
            <Alert
              variant="outline"
              icon={<IconAlertCircle size="1rem" />}
              title={isSuccess ? "Email sent" : "Warning"}
              color="red"
            >
              <Vertical>
                <Text>
                  Your email address is still not verified. Please check your inbox and spam folder
                  for the verification email.
                </Text>
                {!isSuccess && (
                  <Button
                    loading={isSendingEmail}
                    onClick={async () => {
                      await $requestVerificationEmail()
                      showNotification({
                        color: "green",
                        title: "Success",
                        message: "Verification email sent!",
                      })
                    }}
                    color="red"
                    variant="light"
                    size="xs"
                  >
                    Resend verification email
                  </Button>
                )}
                {isSendingEmail && <Text>The email has been sent.</Text>}
              </Vertical>
            </Alert>
          )}
          {isOwner && <Button onClick={open}>Edit Profile</Button>}
          <Text>Hello {user.name}</Text>
          <Text>Bio: {user.bio}</Text>
        </Vertical>
      </Layout>
    </>
  )
}

export default ProfilePage
