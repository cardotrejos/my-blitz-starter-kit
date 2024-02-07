import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react"

import type { OurFileRouter } from "src/uploadthing/uploadthing-router"

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
