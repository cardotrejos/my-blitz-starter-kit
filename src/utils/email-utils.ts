import { regenerateToken } from "@/utils/blitz-utils"
import { TokenType } from "@prisma/client"
import { APP_ORIGIN } from "@/config"

export const generateUnsubscribeLink = async ({ userId, userEmail }) => {
  const token = await regenerateToken({
    tokenType: TokenType.UNSUBSCRIBE_EMAIL,
    userId: userId,
    userEmail: userEmail,
    expiryHours: 48, // longer expiration time for this flow
    deleteExisting: false, // unlike the forgot password flow, here the token should not be delete every time a new one is created
  })

  let unsubscribeLink: string = `${APP_ORIGIN}/unsubscribe?token-${token}`

  return unsubscribeLink
}
