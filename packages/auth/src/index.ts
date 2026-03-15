import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@meta-geniusz/database';

// ============================================================
// BETTER AUTH CONFIGURATION
// ============================================================

const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
if (!betterAuthSecret) {
  throw new Error(
    '[auth] BETTER_AUTH_SECRET is required. Copy apps/api/.env.example to apps/api/.env and fill in the secrets.',
  );
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: betterAuthSecret,
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3001',
  trustedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000').split(','),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: process.env.NODE_ENV === 'production',
    minPasswordLength: 8,
  },

  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },

  session: {
    expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
    updateAge: 24 * 60 * 60,     // refresh if older than 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,            // 5 minutes
    },
  },

  user: {
    additionalFields: {
      username: {
        type: 'string',
        required: false,
        unique: true,
      },
      bio: {
        type: 'string',
        required: false,
      },
      role: {
        type: 'string',
        defaultValue: 'USER',
      },
      status: {
        type: 'string',
        defaultValue: 'ACTIVE',
      },
      phoneVerified: {
        type: 'boolean',
        defaultValue: false,
      },
      identityVerified: {
        type: 'boolean',
        defaultValue: false,
      },
    },
  },
});

// ============================================================
// TYPES
// ============================================================

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session;

// ============================================================
// MIDDLEWARE HELPER (Express)
// ============================================================

import type { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name?: string;
    username?: string;
    role: string;
    status: string;
  };
  sessionToken?: string;
}

/**
 * Express middleware — validates the Better Auth session from the
 * Authorization header or cookie and attaches `req.user`.
 */
export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Better Auth expects a Request-like object; we construct a minimal one
    // since Express doesn't use the standard fetch Request
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === 'string') headers[key] = value;
      else if (Array.isArray(value)) headers[key] = value[0] ?? '';
    }

    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const fetchReq = new Request(url, {
      method: req.method,
      headers,
    });

    const session = await auth.api.getSession({ headers: fetchReq.headers });

    if (!session || !session.user) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    if ((session.user as { status?: string }).status === 'BANNED' ||
        (session.user as { status?: string }).status === 'SUSPENDED') {
      res.status(403).json({ success: false, error: 'Account suspended or banned' });
      return;
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name ?? undefined,
      username: (session.user as { username?: string }).username ?? undefined,
      role: (session.user as { role?: string }).role ?? 'USER',
      status: (session.user as { status?: string }).status ?? 'ACTIVE',
    };

    next();
  } catch {
    res.status(401).json({ success: false, error: 'Invalid session' });
  }
}

/**
 * Same as requireAuth but attaches user if present without blocking.
 */
export async function optionalAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === 'string') headers[key] = value;
      else if (Array.isArray(value)) headers[key] = value[0] ?? '';
    }

    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const fetchReq = new Request(url, { method: req.method, headers });
    const session = await auth.api.getSession({ headers: fetchReq.headers });

    if (session?.user) {
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name ?? undefined,
        username: (session.user as { username?: string }).username ?? undefined,
        role: (session.user as { role?: string }).role ?? 'USER',
        status: (session.user as { status?: string }).status ?? 'ACTIVE',
      };
    }
  } catch {
    // Silently ignore auth errors in optional middleware
  }
  next();
}

/**
 * Role guard — must be used AFTER requireAuth.
 */
export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    next();
  };
}
