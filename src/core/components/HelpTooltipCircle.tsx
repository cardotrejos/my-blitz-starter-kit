import { IconHelpCircle } from "@tabler/icons-react"
import { Tooltip } from "@mantine/core"

export const HelpTooltipCircle = ({ tooltip }) => (
  <Tooltip bg="gray.9" sx={{ boxShadow: "lg", color: "white" }} label={tooltip}>
    <IconHelpCircle size={18}>{tooltip}</IconHelpCircle>
  </Tooltip>
)
