export const remapVariables = ({ variables, specialVariables }) => {
  return variables.map((v) => {
    let newValue = v.value
    for (const key in specialVariables) {
      newValue = newValue.replaceAll(`{{${key}}}`, specialVariables[key])
    }
    return {
      key: v.key,
      value: newValue,
    }
  })
}
