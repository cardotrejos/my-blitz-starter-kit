import { createNextPageApiHandler } from "uploadthing/next-legacy"
import { ourFileRouter } from "@/uploadthing/uploadthing-router"

const handler = createNextPageApiHandler({
  router: ourFileRouter,
})

export default handler
