import { PrismaClient } from "@prisma/client";
import { User } from "wasp/entities";
import type { MiddlewareConfigFn } from "wasp/server";
import type { PaymentsWebhook } from "wasp/server/api";
import type { PaymentPlan } from "./plans";
import { stripePaymentProcessor } from "./stripe/paymentProcessor";

export interface CreateCheckoutSessionArgs {
  userId: User["id"];
  userEmail: NonNullable<User["email"]>;
  paymentPlan: PaymentPlan;
  prismaUserDelegate: PrismaClient["user"];
}

export interface FetchCustomerPortalUrlArgs {
  userId: User["id"];
  prismaUserDelegate: PrismaClient["user"];
}

export interface PaymentProcessor {
  id: "stripe";
  createCheckoutSession: (
    args: CreateCheckoutSessionArgs,
  ) => Promise<{ session: { id: string; url: string } }>;
  fetchCustomerPortalUrl: (
    args: FetchCustomerPortalUrlArgs,
  ) => Promise<string | null>;
  webhook: PaymentsWebhook;
  webhookMiddlewareConfigFn: MiddlewareConfigFn;
  fetchTotalRevenue: () => Promise<number>;
}

// Stripe is the only wired-up processor; the unused LemonSqueezy and Polar
// template implementations were deleted (per the template's own instruction).
export const paymentProcessor: PaymentProcessor = stripePaymentProcessor;
