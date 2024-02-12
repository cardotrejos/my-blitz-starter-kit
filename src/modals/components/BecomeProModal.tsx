import { ReactFC } from "~/types"
import { ContextModalProps } from "@mantine/modals"
import { Horizontal, Vertical } from "mantine-layout-components"
import { Button } from "@mantine/core"

type InnerProps = {}

export const BecomeProModalComponent: ReactFC<ContextModalProps<InnerProps>> = ({
  context,
  id,
  innerProps,
}) => {
  const {} = innerProps

  const handleCloseModal = () => context.closeModal(id)

  return (
    <Vertical fullW spacing={15}>
      <Vertical>Hello from BecomeProModal modal</Vertical>
      <Horizontal fullW spaceBetween>
        <Button color="gray" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("submit")
          }}
        >
          Submit
        </Button>
      </Horizontal>
    </Vertical>
  )
}
