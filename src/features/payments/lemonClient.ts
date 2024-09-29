import { env } from '@/env.mjs';
import { createCheckout, lemonSqueezySetup, listVariants, listProducts, ListProducts, ListVariants } from '@lemonsqueezy/lemonsqueezy.js';

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

export async function getProducts(): Promise<ListProducts> {
  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error("Lemon Squeezy error", error);
    },
  });

  const response = await listProducts();
  if (!response || !response.data) throw new Error("Failed to fetch products");
  return response.data;
}

export async function getVariants(productId: string): Promise<ListVariants> {
  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error("Lemon Squeezy error", error);
    },
  });

  const variants = await listVariants({
    filter: {
      productId: productId,
    },
  });
  
  if (!variants || !variants.data) throw new Error("Failed to fetch variants");
  return variants.data;
}