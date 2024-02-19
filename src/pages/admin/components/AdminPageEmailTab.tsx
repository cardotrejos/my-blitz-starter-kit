import { Horizontal, Vertical } from "mantine-layout-components"
import { ActionIcon, Button, Input, Select } from "@mantine/core"
import { EmailList } from "@/features/email/types"
import { useMutation } from "@blitzjs/rpc"
import sendBulkEmail from "@/features/email/mutations/sendBulkEmail"
import React from "react"
import { emailTemplates } from "@/features/email/templates"
import { EmailTemplate } from "~/email/types"
import { UseArray, useArray } from "react-hanger"
import { ReactFC } from "~/types"
import { convertArrayToObject } from "@/utils/utils"
import { IconTrash } from "@tabler/icons-react"

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
]

type VariableType = {
  id: string
  key: string
  value: string
}

const Variable: ReactFC<{
  variable: VariableType
  variables: Variables
}> = ({ variable, variables }) => {
  // TODO: extract this into a separate function
  const updateArrayMemberById = (update: Omit<Partial<VariableType>, "id">) => {
    const updated = variables.value.map((v) => {
      if (v.id !== variable.id) return v
      return { ...v, ...update }
    })
    variables.setValue(updated)
  }

  return (
    <Horizontal>
      <ActionIcon onClick={() => variables.removeById(variable.id)}>
        <IconTrash />
      </ActionIcon>
      <Input
        onChange={(e) => updateArrayMemberById({ key: e.target.value })}
        placeholder="key"
        value={variable.key}
      />
      <Input
        onChange={(e) => updateArrayMemberById({ value: e.target.value })}
        placeholder="value"
        value={variable.value}
      />
    </Horizontal>
  )
}

type Variables = UseArray<any>

const VariablesManager: ReactFC<{
  variables: Variables
}> = ({ variables }) => {
  return (
    <Vertical>
      <Button
        onClick={() =>
          variables.push({
            id: Math.random().toString(),
            key: "",
            value: "",
          })
        }
      >
        Add variable
      </Button>
      <Vertical>
        {variables.value.map((v) => (
          <Horizontal>
            <Variable variable={v} variables={variables} key={v.id} />
          </Horizontal>
        ))}
      </Vertical>
    </Vertical>
  )
}

export const AdminPageEmailTab = () => {
  const [list, setList] = React.useState<EmailList>(EmailList.Marketing)
  const [template, setTemplate] = React.useState(emailTemplates[0]!.value)
  const variables = useArray([])

  const [$sendBulkEmail] = useMutation(sendBulkEmail)

  const foundTemplate = emailTemplates.find((e) => e.value === template)

  const componentProps = convertArrayToObject(variables.value)

  return (
    <Horizontal align="flex-start" mih="100vh" fullH>
      <Vertical>
        <Select
          label="Choose email list"
          placeholder="Pick one"
          data={options}
          value={list}
          onChange={(value) => setList(value as EmailList)}
        />
        <Select
          label="Choose template"
          placeholder="Pick one"
          data={emailTemplates.map((e) => {
            return {
              value: e.value,
              label: e.name,
            }
          })}
          onChange={(value) => setTemplate(value as EmailTemplate)}
          value={template}
        />

        <VariablesManager variables={variables} />

        <Button onClick={() => $sendBulkEmail({ list, template })}>Send Email</Button>
      </Vertical>

      {foundTemplate && <foundTemplate.component props={componentProps} />}
    </Horizontal>
  )
}
