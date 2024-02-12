import { BecomeProModalComponent } from "@/modals/components/BecomeProModal"
import { ReportBugModalComponent } from "@/modals/components/ReportBugModal"

export enum GlobalModal {
  becomePro = "becomePro",
  reportBug = "reportBug",
}

export const globalModals = {
  [GlobalModal.becomePro]: BecomeProModalComponent,
  [GlobalModal.becomePro]: ReportBugModalComponent,
}

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof globalModals
  }
}
