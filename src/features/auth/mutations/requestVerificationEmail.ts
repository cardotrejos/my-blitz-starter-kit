import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  id: z.string(),
})
export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ id }, { session: { userId } }) => {
    return db.user.findFirst({
      where: { id },
    })
  },
)
