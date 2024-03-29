import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    let user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, username: true, bio: true, avatarImageKey: true },
    })
    if (!user) throw new NotFoundError()
    return user
  },
)
