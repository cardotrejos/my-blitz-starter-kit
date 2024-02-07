import { createRouteHandler } from "uploadthing/next-legacy"

import { ourFileRouter } from "~/src/uploadthing/uploadthing-router"

export default createRouteHandler({
  router: ourFileRouter,
})
