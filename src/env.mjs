import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string(),
    NODEMAILER_LOCAL_USER: z.string().optional(),
    NODEMAILER_LOCAL_PASS: z.string().optional(),
    UPLOADTHING_SECRET: z.string(),
    UPLOADTHING_APP_ID: z.string(),
    LEMONSQUEEZY_WEBHOOK_SECRET: z.string(),
    LEMONSQUEEZY_API_KEY: z.string(),
    LEMONSQUEEZY_STORE_ID: z.string(),
    LEMONSQUEEZY_PRODUCT_ID: z.string(),
  },
  client: {
  },
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NODEMAILER_LOCAL_USER: process.env.NODEMAILER_LOCAL_USER,
    NODEMAILER_LOCAL_PASS: process.env.NODEMAILER_LOCAL_PASS,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
    LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
    LEMONSQUEEZY_PRODUCT_ID: process.env.LEMONSQUEEZY_PRODUCT_ID,
  },
});