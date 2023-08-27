import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import { Role } from "~/types"
import { SignupInput } from "@/features/auth/schemas"
import db from "~/db"
import { PrismaError } from "@/utils/blitz-utils"

export default resolver.pipe(resolver.zod(SignupInput), async ({ email, name, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  try {
    const user = await db.user.create({
      data: { email: email.toLowerCase().trim(), name, hashedPassword, role: "USER" },
      select: { id: true, name: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  } catch (error) {
    throw new PrismaError(error.message, error.code, error.meta)
  }
})
