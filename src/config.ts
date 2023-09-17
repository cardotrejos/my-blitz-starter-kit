export const isDev = process.env.NODE_ENV === "development"
const PROD_URL = "https://www.example.com"
const DEV_URL = "http://localhost:3000"
export const APP_ORIGIN = isDev ? DEV_URL : PROD_URL

export const APP_NAME = "YourAppName"
