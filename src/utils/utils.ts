import { useParam } from "@blitzjs/next"

export const useStringParam = (paramName: string) => {
  return useParam(paramName, "string")
}
