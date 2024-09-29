import { env } from '@/env.mjs';
import { createCheckout, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

const apiKey = env.LEMONSQUEEZY_API_KEY;

export async function createCheckoutLink(storeId: string, variantId: string, options: any) {
  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error("Lemon Squeezy error", error);
    },
  });

  try {
    const checkout = await createCheckout(
      storeId,
      variantId,
      options,
    );

    return checkout.data;
  } catch (error) {
    console.error("Error creating checkout link", error);
    throw new Error("Failed to create checkout link");
  }
}