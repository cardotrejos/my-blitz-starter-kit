import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db from "~/db";
import { env } from "@/env.mjs";
import { type NewCheckout, type Checkout, createCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import { createCheckoutLink } from "../lemonClient";

const Input = z.object({
});


const storeId = env.LEMONSQUEEZY_STORE_ID;
const variantId = '537943'

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ }, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found");

    const checkoutLink = await createCheckoutLink(
      storeId,
      variantId,
      {
        checkoutData: {
          email: user.email,
          custom: {
            user_id: user.id,
          },
        },
        testMode: true,
      },
    );

    const url = checkoutLink?.data.attributes.url;

    return url;
  }
);