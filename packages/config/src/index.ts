import { z } from 'zod';

// ============================================================
// ENVIRONMENT SCHEMA
// ============================================================

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('Invalid DATABASE_URL'),

  // Auth (Better Auth)
  BETTER_AUTH_SECRET: z.string().min(32).default('dev-secret-change-in-production'),
  BETTER_AUTH_URL: z.string().url().default('http://localhost:3001'),

  // OAuth
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),

  // AI (Google Gemini)
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default('gemini-1.5-flash'),

  // Email (Resend)
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().default('noreply@metageniusz.com'),

  // Storage
  STORAGE_PROVIDER: z.enum(['local', 's3', 'r2']).default('local'),
  STORAGE_LOCAL_PATH: z.string().default('./uploads'),
  STORAGE_BASE_URL: z.string().url().default('http://localhost:3001/uploads'),

  // Payments (Stripe)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // App
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000,http://localhost:3001'),

  // Rate limit
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(100),

  // JWT (legacy)
  JWT_SECRET: z.string().min(32).default('dev-jwt-secret-change-in-production'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('[config] Environment validation failed:');
      error.errors.forEach(err => {
        console.error(`  ${err.path.join('.')}: ${err.message}`);
      });
    }
    throw error;
  }
}

// Singleton – lazily validated once
let _env: EnvConfig | null = null;
export function getEnv(): EnvConfig {
  if (!_env) _env = validateEnv();
  return _env;
}

// ============================================================
// DERIVED CONFIGS
// ============================================================

export const apiConfig = {
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 900000),
    max: Number(process.env.RATE_LIMIT_MAX ?? 100),
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  cors: {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  },
};

export const authConfig = {
  secret: process.env.BETTER_AUTH_SECRET ?? 'dev-secret',
  baseUrl: process.env.BETTER_AUTH_URL ?? 'http://localhost:3001',
  trustedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000').split(','),
  emailVerificationEnabled: process.env.NODE_ENV === 'production',
};

export const aiConfig = {
  apiKey: process.env.GEMINI_API_KEY,
  model: process.env.GEMINI_MODEL ?? 'gemini-1.5-flash',
  defaultCredits: 10,
  creditCost: {
    bio: 1,
    caption: 1,
    hashtags: 1,
    promo: 2,
    ideas: 2,
    cover: 3,
    workflow: 2,
  } as Record<string, number>,
};

export const emailConfig = {
  apiKey: process.env.RESEND_API_KEY,
  fromEmail: process.env.RESEND_FROM_EMAIL ?? 'noreply@metageniusz.com',
  fromName: 'META-GENIUSZ OS',
};

export const storageConfig = {
  provider: (process.env.STORAGE_PROVIDER ?? 'local') as 'local' | 's3' | 'r2',
  localPath: process.env.STORAGE_LOCAL_PATH ?? './uploads',
  baseUrl: process.env.STORAGE_BASE_URL ?? 'http://localhost:3001/uploads',
  allowedMimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4'],
  maxSizeBytes: 50 * 1024 * 1024, // 50 MB
};

export const paymentsConfig = {
  provider: 'mock' as 'mock' | 'stripe',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

// ============================================================
// FEATURE FLAGS
// ============================================================

export const features = {
  aiEnabled: Boolean(process.env.GEMINI_API_KEY),
  emailEnabled: Boolean(process.env.RESEND_API_KEY),
  paymentsEnabled: Boolean(process.env.STRIPE_SECRET_KEY),
  oauthGoogle: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  oauthGithub: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
  socialFeatures: process.env.ENABLE_SOCIAL_FEATURES !== 'false',
  analytics: process.env.ENABLE_ANALYTICS !== 'false',
  recommendations: process.env.ENABLE_RECOMMENDATIONS !== 'false',
  ageGate: process.env.ENABLE_AGE_GATE !== 'false',
};

// ============================================================
// SUBSCRIPTION PLANS
// ============================================================

export const subscriptionPlans = {
  FREE:          { price: 0,   aiCredits: 10,   name: 'Free' },
  HHU_PRO:      { price: 9.99, aiCredits: 50,   name: 'HHU Pro' },
  AI_STARTER:   { price: 4.99, aiCredits: 50,   name: 'AI Starter' },
  AI_PRO:       { price: 14.99,aiCredits: 250,  name: 'AI Pro' },
  AI_UNLIMITED: { price: 29.99,aiCredits: 9999, name: 'AI Unlimited' },
  RFG_PRO:      { price: 19.99,aiCredits: 100,  name: 'RFG Pro' },
} as const;

export type PlanKey = keyof typeof subscriptionPlans;
