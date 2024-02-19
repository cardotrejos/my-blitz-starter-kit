import Layout from "@/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { Tabs } from "@mantine/core"
import { IconMail } from "@tabler/icons-react"
import { AdminPageEmailTab } from "@/pages/admin/components/AdminPageEmailTab"

export const AdminPage: BlitzPage = () => {
  return (
    <Layout>
      <Vertical fullW>
        <Tabs w="100%" orientation="vertical" defaultValue="email">
          <Tabs.List>
            <Tabs.Tab value="email" icon={<IconMail size="0.8rem" />}>
              Email
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="email" pl="xs">
            <AdminPageEmailTab />
          </Tabs.Panel>
        </Tabs>
      </Vertical>
    </Layout>
  )
}

AdminPage.authenticate = true
export default AdminPage
