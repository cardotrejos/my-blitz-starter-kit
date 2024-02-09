import { generateComponents, generateReactHelpers } from "@uploadthing/react"
import { OurFileRouter } from "@/uploadthing/uploadthing-router"

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>()

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()
