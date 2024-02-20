export enum EmailList {
  Marketing = "marketing",
  Product = "product",
  All = "all",
}

export type VariableType = {
  id: string
  key: string
  value: string
  isTextArea?: boolean
}

export enum EmailTemplate {
  Dummy = "dummy",
  BlackFridaySale = "black-friday-sale",
}

export type SpecialVariables = {
  userName: string
  userEmail: string
  userBio: string
  userId: string
  userUsername: string
  userAvatarImageKey: string
}
