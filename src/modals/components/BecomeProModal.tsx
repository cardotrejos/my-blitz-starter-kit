import { ReactFC } from "~/types"
import { ContextModalProps } from "@mantine/modals"
import { Horizontal, Vertical } from "mantine-layout-components"
import { Button } from "@mantine/core"
import generateCheckoutLink from "@/features/payments/mutations/generateCheckoutLink"
import { useMutation } from "@blitzjs/rpc"
import { openUrlInNewTab } from "@/utils/utils"

type InnerProps = {
  price: number
}

export const BecomeProModalComponent: ReactFC<ContextModalProps<InnerProps>> = ({
  context,
  id,
  innerProps,
}) => {
  const { price } = innerProps

  const [$generateCheckoutLink, { isLoading }] = useMutation(generateCheckoutLink, {})

  const handleCloseModal = () => context.closeModal(id)

  let onPurchaseClick = async () => {
    const checkoutLink = await $generateCheckoutLink({})
    openUrlInNewTab(checkoutLink!)
  }

  return (
    <Vertical fullW spacing={15}>
      <Vertical>You can purchase pro for ${price}</Vertical>
      <Horizontal fullW spaceBetween>
        <Button color="gray" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={onPurchaseClick}
          loading={isLoading}
        >
          Purchase
        </Button>
      </Horizontal>
    </Vertical>
  )
}
