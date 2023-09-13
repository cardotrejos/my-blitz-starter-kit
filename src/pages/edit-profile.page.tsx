import React from "react"
import Layout from "@/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { showNotification } from "@mantine/notifications"
import { router } from "next/client"
import { useForm, zodResolver } from "@mantine/form"
import { UpdateProfileInput, UpdateProfileInputType } from "@/features/users/schemas"
import { useMutation, useQuery } from "@blitzjs/rpc"
import updateProfile from "@/features/users/mutations/updateProfile"
import EditProfileForm from "@/features/users/forms/EditProfileForm"
import getUserForEditingProfile from "@/features/users/queries/getUserForEditingProfile"
import { useRouter } from "next/router"
import { Button } from "@mantine/core"

export const EditProfilePage: BlitzPage = () => {
  const [$updateProfile, { isLoading }] = useMutation(updateProfile)

  const [user] = useQuery(
    getUserForEditingProfile,
    {},
    {
      enabled: false,
    },
  )

  const router = useRouter()

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  /* Example of how to load data from the server and fill form with it
  let loadDataAndFillForm = async () => {
    const { data } = await refetch()
    let values = {
      name: data?.name || "",
      username: data?.username || "",
      bio: data?.bio || "",
    }
    form.setValues(values)
    form.resetDirty(values)
  }
*/

  return (
    <Layout>
      <Vertical>
        {/*<Button onClick={loadDataAndFillForm}>Load Data</Button> */}
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values)
            const { username } = values
            if (username) {
              router.push(Routes.ProfilePage({ username }))
            }
            showNotification({ color: "green", title: "Success", message: "Profile updated!" })
            close()
          }}
          isSubmitting={isLoading}
        />
      </Vertical>
    </Layout>
  )
}

export default EditProfilePage
