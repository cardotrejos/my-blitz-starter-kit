import React, { FC } from "react"

interface ConditionalWrapProps {
  if: boolean
  with: (children: React.ReactNode) => JSX.Element
  children: React.ReactNode
}

export const Conditional: FC<ConditionalWrapProps> = ({
  if: condition,
  with: wrapper,
  children,
}) => {
  return condition ? wrapper(children) : <>children</>
}
