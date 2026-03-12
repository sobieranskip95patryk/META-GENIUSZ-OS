import { PrismaClient } from '@prisma/client';

// ============================================================
// PRISMA SINGLETON
// ============================================================

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'warn', 'error']
      : ['warn', 'error'],
  });
}

// In development reuse the client across hot-reloads to avoid exhausting connections
export const prisma: PrismaClient =
  globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// ============================================================
// PAGINATION HELPER
// ============================================================

export interface PaginateOptions {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export async function paginate<T>(
  countFn: () => Promise<number>,
  findFn: (skip: number, take: number) => Promise<T[]>,
  options: PaginateOptions = {},
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, options.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, options.pageSize ?? 20));
  const skip = (page - 1) * pageSize;

  const [total, items] = await Promise.all([countFn(), findFn(skip, pageSize)]);

  return {
    items,
    total,
    page,
    pageSize,
    hasMore: skip + items.length < total,
  };
}

// ============================================================
// SOFT DELETE HELPER
// ============================================================

export function softDelete(id: string) {
  return prisma.user.update({
    where: { id },
    data: { deletedAt: new Date(), status: 'SOFT_DELETED' },
  });
}

// ============================================================
// TRANSACTION WRAPPER
// ============================================================

export async function withTransaction<T>(
  fn: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<T>,
): Promise<T> {
  return prisma.$transaction(fn);
}

// re-export PrismaClient types
export { PrismaClient };
export * from '@prisma/client';
