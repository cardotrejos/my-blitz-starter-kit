import { resolver } from "@blitzjs/rpc"
import { Role } from "~/types"
import { email, password } from "@/features/auth/schemas"
import { authenticateUser } from "@/utils/auth-utils"
import { z } from "zod"

export const LoginInput = z.object({
  email,
  password: z.string(),
})
export default resolver.pipe(resolver.zod(LoginInput), async (params, ctx) => {
  // This throws an error if credentials are invalid
  const { email, password } = params

  const user = await authenticateUser(email, password)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
})
