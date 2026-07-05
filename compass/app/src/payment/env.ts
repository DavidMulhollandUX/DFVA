import * as z from "zod";

export const paymentPlansSchema = z.object({
  PAYMENTS_HOBBY_SUBSCRIPTION_PLAN_ID: z.string().optional().default(""),
  PAYMENTS_PRO_SUBSCRIPTION_PLAN_ID: z.string().optional().default(""),
  PAYMENTS_CREDITS_10_PLAN_ID: z.string().optional().default(""),
});
