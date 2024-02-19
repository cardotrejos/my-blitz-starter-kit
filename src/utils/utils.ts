import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"

export const useStringParam = (name) => {
  let param = useParam(name, "string")
  return param
}

export const useStringQueryParam = (name) => {
  let { query } = useRouter()
  return query[name]
}

export const chunk = (input: any[], size: number) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [])
}

type ArrayItem = {
  key: string
  value: string
}

export const convertArrayToObject = (array: ArrayItem[]) => {
  return array.reduce((obj, item) => {
    obj[item.key] = item.value
    return obj
  }, {})
}

export const updateArrayMemberById = ({ array, id, update }) => {
  const updated = array.value.map((item) => {
    if (item.id === id) {
      return { ...item, ...update }
    }
    return item
  })
  array.setValue(updated)
}
