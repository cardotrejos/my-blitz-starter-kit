import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { useMutation, useQuery } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Button, List, Loader, Text } from "@mantine/core"
import { Vertical } from "mantine-layout-components"
import getTodos from "@/features/todos/queries/getTodos"
import { Suspense } from "react"

export const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) return null
  return (
    <>
      <Vertical>
        <Text>
          User id: <code>{currentUser.id}</code>
        </Text>
        <Text>
          User role: <code>{currentUser.role}</code>
        </Text>
      </Vertical>
    </>
  )
}
