import { prisma } from '@meta-geniusz/database';

// ============================================================
// PAYMENT PROVIDERS INTERFACE
// ============================================================

export interface CreateCheckoutInput {
  userId: string;
  plan: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
  amount: number;
  currency: string;
  plan: string;
}

export interface CreateTipInput {
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency?: string;
  note?: string;
}

export interface TipResult {
  transactionId: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface IPaymentAdapter {
  createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession>;
  handleWebhook(payload: string, signature: string): Promise<void>;
  createTip(input: CreateTipInput): Promise<TipResult>;
}

// ============================================================
// PLAN PRICES
// ============================================================

export const PLAN_PRICES: Record<string, number> = {
  FREE:          0,
  HHU_PRO:       9.99,
  AI_STARTER:    4.99,
  AI_PRO:        14.99,
  AI_UNLIMITED:  29.99,
  RFG_PRO:       19.99,
};

// ============================================================
// MOCK ADAPTER (active until real Stripe account exists)
// ============================================================

export class MockPaymentAdapter implements IPaymentAdapter {
  async createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession> {
    const amount = PLAN_PRICES[input.plan] ?? 0;

    // Record the subscription immediately as active (mock flow)
    await prisma.subscription.create({
      data: {
        subscriberId: input.userId,
        plan: input.plan,
        status: 'ACTIVE',
        endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      id: `mock_cs_${Date.now()}`,
      url: input.successUrl,
      amount,
      currency: 'USD',
      plan: input.plan,
    };
  }

  async handleWebhook(_payload: string, _signature: string): Promise<void> {
    // No-op in mock mode
  }

  async createTip(input: CreateTipInput): Promise<TipResult> {
    const tx = await prisma.transaction.create({
      data: {
        fromUserId: input.fromUserId,
        toUserId: input.toUserId,
        amount: input.amount,
        currency: input.currency ?? 'USD',
        type: 'TIP',
        status: 'COMPLETED',
        note: input.note,
      },
    });

    return { transactionId: tx.id, status: 'COMPLETED' };
  }
}

// ============================================================
// STRIPE ADAPTER (ready for when real keys are added)
// ============================================================

export class StripePaymentAdapter implements IPaymentAdapter {
  private stripe: unknown;

  constructor() {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set');

    // Dynamic import to avoid hard dependency when Stripe is not installed
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Stripe = require('stripe');
    this.stripe = new Stripe(stripeKey, { apiVersion: '2024-04-10' });
  }

  async createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession> {
    const s = this.stripe as {
      checkout: { sessions: { create: (opts: Record<string, unknown>) => Promise<{ id: string; url: string | null }> } };
    };
    const amount = PLAN_PRICES[input.plan] ?? 0;
    const session = await s.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', unit_amount: Math.round(amount * 100), product_data: { name: input.plan }, recurring: { interval: 'month' } }, quantity: 1 }],
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      metadata: { userId: input.userId, plan: input.plan },
    });

    return { id: session.id, url: session.url ?? input.successUrl, amount, currency: 'USD', plan: input.plan };
  }

  async handleWebhook(payload: string, signature: string): Promise<void> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET is not set');

    const s = this.stripe as {
      webhooks: { constructEvent: (p: string, sig: string, secret: string) => { type: string; data: { object: Record<string, unknown> } } };
    };
    const event = s.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as { metadata: { userId: string; plan: string }; subscription: string };
      await prisma.subscription.create({
        data: {
          subscriberId: session.metadata.userId,
          plan: session.metadata.plan,
          status: 'ACTIVE',
          stripeSubId: session.subscription,
          endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }
  }

  async createTip(input: CreateTipInput): Promise<TipResult> {
    // For direct tips we record in DB and handle payout separately
    const tx = await prisma.transaction.create({
      data: {
        fromUserId: input.fromUserId,
        toUserId: input.toUserId,
        amount: input.amount,
        currency: input.currency ?? 'USD',
        type: 'TIP',
        status: 'PENDING',
        note: input.note,
      },
    });

    return { transactionId: tx.id, status: 'PENDING' };
  }
}

// ============================================================
// FACTORY — returns mock unless real Stripe key exists
// ============================================================

export function createPaymentAdapter(): IPaymentAdapter {
  if (process.env.STRIPE_SECRET_KEY) {
    return new StripePaymentAdapter();
  }
  return new MockPaymentAdapter();
}

export const payments = createPaymentAdapter();
