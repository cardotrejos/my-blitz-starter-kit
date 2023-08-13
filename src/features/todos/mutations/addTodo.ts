import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import * as console from "console"
import db from "~/db"

const Input = z.object({
  title: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ title }, { session: { userId } }) => {
    const todo = await db.todo.create({
      data: {
        title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return todo
  },
)
