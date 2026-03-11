import { z } from 'zod';

// Environment variables schema
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('Invalid DATABASE_URL'),
  
  // API Configuration
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRY: z.string().default('7d'),
  
  // CORS
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),
  
  // Redis (optional)
  REDIS_URL: z.string().url().optional(),
  
  // Third-party services
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  const env = process.env;
  
  try {
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Environment validation failed:');
      error.errors.forEach(err => {
        console.error(`  ${err.path.join('.')}: ${err.message}`);
      });
    }
    throw error;
  }
}

// API Configuration
export const apiConfig = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per windowMs
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  cors: {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  },
};

// Feature flags
export const features = {
  socialFeatures: process.env.ENABLE_SOCIAL_FEATURES !== 'false',
  analytics: process.env.ENABLE_ANALYTICS !== 'false',
  recommendations: process.env.ENABLE_RECOMMENDATIONS !== 'false',
};
