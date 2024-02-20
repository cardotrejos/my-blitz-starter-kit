import { Horizontal, Vertical } from "mantine-layout-components"
import { ActionIcon, Button, Input, Select, Textarea, Tooltip } from "@mantine/core"
import { EmailList, SpecialVariables, VariableType } from "@/features/email/types"
import { useMutation } from "@blitzjs/rpc"
import sendBulkEmail from "@/features/email/mutations/sendBulkEmail"
import React from "react"
import { emailTemplates } from "@/features/email/templates"
import { EmailTemplate } from "~/email/types"
import { UseArray, useArray, useInput } from "react-hanger"
import { ReactFC } from "~/types"
import { convertArrayToObject, updateArrayMemberById } from "@/utils/utils"
import { IconTrash, IconTextResize, IconPencil } from "@tabler/icons-react"
import { remapVariables } from "@/features/email/utils"

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
]

// TODO: Implement RichText Editor

const Variable: ReactFC<{
  variable: VariableType
  variables: Variables
}> = ({ variable, variables }) => {
  const updateVariable = (update: Partial<VariableType>) => {
    updateArrayMemberById({
      array: variables,
      id: variable.id,
      update,
    })
  }

  const writingElementProps = {
    onChange: (e) => updateVariable({ value: e.target.value }),
    placeholder: "Value",
    value: variable.value,
  }

  return (
    <Horizontal>
      <Horizontal spacing="xs" align="center">
        <ActionIcon variant="light" color="red" onClick={() => variables.removeById(variable.id)}>
          <IconTrash size="13" />
        </ActionIcon>

        <Tooltip label={"Click to toggle between textarea and input"}>
          <ActionIcon
            variant="light"
            onClick={() =>
              updateVariable({
                isTextArea: !variable.isTextArea,
              })
            }
          >
            {variable.isTextArea ? <IconTextResize size={13} /> : <IconPencil size={13} />}
          </ActionIcon>
        </Tooltip>
      </Horizontal>
      <Input
        onChange={(e) => updateVariable({ key: e.target.value })}
        placeholder="key"
        value={variable.key}
      />
      {variable.isTextArea && <Textarea minRows={10} w={300} {...writingElementProps} />}
      {!variable.isTextArea && <Input {...writingElementProps} />}
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

let specialVariables: SpecialVariables = {
  userName: "John",
  userEmail: "qOQpM@example.com",
  userBio: "I am a user",
  userId: "123",
  userUsername: "john",
  userAvatarImageKey: "123",
}

export const AdminPageEmailTab = () => {
  const [list, setList] = React.useState<EmailList>(EmailList.Marketing)
  const [template, setTemplate] = React.useState(emailTemplates[0]!.value)
  const variables = useArray<VariableType>([])

  const subject = useInput()

  const [$sendBulkEmail] = useMutation(sendBulkEmail)

  const foundTemplate = emailTemplates.find((e) => e.value === template)

  const remappedVariables = remapVariables({
    variables: variables.value,
    specialVariables: specialVariables,
  })

  const componentProps = convertArrayToObject(remappedVariables)

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

        <Input placeholder="Subject" {...subject.eventBind} />

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

        <Button
          onClick={() => {
            $sendBulkEmail({
              list,
              template,
              subject: subject.value,
              variables: variables.value.map((v) => ({
                key: v.key,
                value: v.value,
              })),
            })
          }}
        >
          Send bulk Email
        </Button>
      </Vertical>

      {foundTemplate && <foundTemplate.component props={componentProps} />}
    </Horizontal>
  )
}
