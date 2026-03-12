import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '@meta-geniusz/auth';
import { prisma } from '@meta-geniusz/database';
import { upload, staticFilesMiddleware, getFileUrl } from '@meta-geniusz/storage';
import { runAIGeneration, getCredits } from '@meta-geniusz/ai-core';
import { track, getUserStats, getGlobalStats } from '@meta-geniusz/analytics';
import { payments } from '@meta-geniusz/payments';
import { requireAuth, requireRole, type AuthRequest } from '@meta-geniusz/auth';
import { z } from 'zod';

// ============================================================
// APP SETUP
// ============================================================

const app = express();
const PORT = Number(process.env.PORT ?? 3001);
app.disable('x-powered-by');

// Security
app.use(helmet());

// CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000').split(',');
app.use(cors({
  origin: (origin: string | undefined, cb: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Rate limiting
app.use(rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 900000),
  max: Number(process.env.RATE_LIMIT_MAX ?? 100),
  standardHeaders: true,
  legacyHeaders: false,
}));

// Static files for uploads
app.use('/uploads', staticFilesMiddleware());

// ============================================================
// BETTER AUTH — handles /api/auth/* routes
// ============================================================

app.all('/api/auth/*', toNodeHandler(auth));

// ============================================================
// HELPERS
// ============================================================

function ok<T>(res: express.Response, data: T, status = 200) {
  return res.status(status).json({ success: true, data });
}

function fail(res: express.Response, message: string, status = 400) {
  return res.status(status).json({ success: false, error: message });
}

function validate<S extends z.ZodTypeAny>(schema: S, data: unknown): { data: z.infer<S> } | { error: string } {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { error: result.error.errors.map((issue: z.ZodIssue) => `${issue.path.join('.')}: ${issue.message}`).join(', ') };
  }
  return { data: result.data };
}

// ============================================================
// HEALTH
// ============================================================

app.get('/', (_req, res) => res.json({ system: 'META-GENIUSZ OS API', version: '1.0.0', status: 'running' }));
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: 'connected' });
  } catch {
    res.status(503).json({ ok: false, db: 'disconnected' });
  }
});

// ============================================================
// USERS
// ============================================================

/** GET /users — paginated list */
app.get('/users', async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 20);
  const skip = (page - 1) * pageSize;

  const [total, items] = await Promise.all([
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.user.findMany({
      where: { status: 'ACTIVE' },
      skip,
      take: pageSize,
      select: {
        id: true, name: true, username: true, bio: true, image: true,
        role: true, createdAt: true,
        _count: { select: { followers: true, following: true, posts: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return ok(res, { items, total, page, pageSize, hasMore: skip + items.length < total });
});

/** GET /users/:username — public profile */
app.get('/users/:username', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.params.username },
    select: {
      id: true, name: true, username: true, bio: true, image: true,
      role: true, createdAt: true,
      _count: { select: { followers: true, following: true, posts: true } },
    },
  });
  if (!user) return fail(res, 'User not found', 404);
  return ok(res, user);
});

/** PATCH /users/me — update own profile */
app.patch('/users/me', requireAuth, async (req: AuthRequest, res) => {
  const schema = z.object({
    name:     z.string().min(1).max(80).optional(),
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/).optional(),
    bio:      z.string().max(300).optional(),
  });
  const v = validate(schema, req.body);
  if ('error' in v) return fail(res, v.error);

  const existing = v.data.username
    ? await prisma.user.findFirst({ where: { username: v.data.username, NOT: { id: req.user!.id } } })
    : null;
  if (existing) return fail(res, 'Username already taken', 409);

  const updated = await prisma.user.update({
    where: { id: req.user!.id },
    data: v.data,
    select: { id: true, name: true, username: true, bio: true, image: true, role: true },
  });
  return ok(res, updated);
});

/** POST /users/me/avatar — upload avatar */
app.post('/users/me/avatar', requireAuth, upload.single('avatar'), async (req: AuthRequest, res) => {
  if (!req.file) return fail(res, 'No file uploaded');
  const url = getFileUrl(req.file.filename);
  await prisma.user.update({ where: { id: req.user!.id }, data: { image: url } });
  return ok(res, { url });
});

/** GET /users/me/stats */
app.get('/users/me/stats', requireAuth, async (req: AuthRequest, res) => {
  const stats = await getUserStats(req.user!.id);
  return ok(res, stats);
});

// ============================================================
// FOLLOW
// ============================================================

/** POST /users/:id/follow */
app.post('/users/:id/follow', requireAuth, async (req: AuthRequest, res) => {
  const followingId = req.params.id;
  if (followingId === req.user!.id) return fail(res, 'Cannot follow yourself');

  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId: req.user!.id, followingId } },
  });

  if (existing) {
    await prisma.follow.delete({ where: { id: existing.id } });
    return ok(res, { following: false });
  }

  await prisma.follow.create({ data: { followerId: req.user!.id, followingId } });
  await track({ type: 'user_followed', userId: req.user!.id, targetId: followingId });
  return ok(res, { following: true }, 201);
});

/** GET /users/:id/followers */
app.get('/users/:id/followers', async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const take = 20;
  const skip = (page - 1) * take;
  const items = await prisma.follow.findMany({
    where: { followingId: req.params.id },
    skip, take,
    include: { follower: { select: { id: true, name: true, username: true, image: true, bio: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return ok(res, items.map((f) => f.follower));
});

/** GET /users/:id/following */
app.get('/users/:id/following', async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const take = 20;
  const skip = (page - 1) * take;
  const items = await prisma.follow.findMany({
    where: { followerId: req.params.id },
    skip, take,
    include: { following: { select: { id: true, name: true, username: true, image: true, bio: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return ok(res, items.map((f) => f.following));
});

// ============================================================
// POSTS
// ============================================================

const createPostSchema = z.object({
  content:  z.string().min(1).max(2000),
  vertical: z.enum(['HHU', 'RFG', 'AI_STUDIO']).default('HHU'),
  type:     z.enum(['TEXT', 'IMAGE', 'AUDIO', 'VIDEO', 'LINK']).default('TEXT'),
});

/** GET /posts — paginated public feed */
app.get('/posts', async (req, res) => {
  const page     = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 20);
  const vertical = req.query.vertical as string | undefined;
  const skip     = (page - 1) * pageSize;

  const where = {
    status: 'ACTIVE' as const,
    ...(vertical ? { vertical } : {}),
  };

  const [total, items] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where, skip, take: pageSize,
      include: { author: { select: { id: true, name: true, username: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return ok(res, { items, total, page, pageSize, hasMore: skip + items.length < total });
});

/** POST /posts — create */
app.post('/posts', requireAuth, upload.single('image'), async (req: AuthRequest, res) => {
  const v = validate(createPostSchema, req.body);
  if ('error' in v) return fail(res, v.error);

  const imageUrl = req.file ? getFileUrl(req.file.filename) : undefined;

  const post = await prisma.post.create({
    data: { ...v.data, authorId: req.user!.id, imageUrl },
    include: { author: { select: { id: true, name: true, username: true, image: true } } },
  });

  await track({ type: 'post_created', userId: req.user!.id, targetId: post.id });
  return ok(res, post, 201);
});

/** GET /posts/:id */
app.get('/posts/:id', async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
    include: {
      author: { select: { id: true, name: true, username: true, image: true } },
      comments: {
        where: { status: 'ACTIVE', parentId: null },
        include: { author: { select: { id: true, name: true, username: true, image: true } } },
        orderBy: { createdAt: 'asc' },
        take: 20,
      },
    },
  });
  if (!post || post.status !== 'ACTIVE') return fail(res, 'Post not found', 404);
  return ok(res, post);
});

/** DELETE /posts/:id */
app.delete('/posts/:id', requireAuth, async (req: AuthRequest, res) => {
  const post = await prisma.post.findUnique({ where: { id: req.params.id } });
  if (!post) return fail(res, 'Post not found', 404);
  if (post.authorId !== req.user!.id && !['MODERATOR', 'ADMIN', 'SUPER_ADMIN'].includes(req.user!.role)) {
    return fail(res, 'Forbidden', 403);
  }
  await prisma.post.update({ where: { id: req.params.id }, data: { status: 'DELETED' } });
  return ok(res, { deleted: true });
});

// ============================================================
// LIKES
// ============================================================

/** POST /posts/:id/like — toggle */
app.post('/posts/:id/like', requireAuth, async (req: AuthRequest, res) => {
  const postId = req.params.id;
  const userId = req.user!.id;

  const existing = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existing) {
    await prisma.$transaction([
      prisma.like.delete({ where: { id: existing.id } }),
      prisma.post.update({ where: { id: postId }, data: { likesCount: { decrement: 1 } } }),
    ]);
    return ok(res, { liked: false });
  }

  await prisma.$transaction([
    prisma.like.create({ data: { userId, postId } }),
    prisma.post.update({ where: { id: postId }, data: { likesCount: { increment: 1 } } }),
  ]);
  await track({ type: 'post_liked', userId, targetId: postId });
  return ok(res, { liked: true });
});

// ============================================================
// COMMENTS
// ============================================================

/** GET /posts/:id/comments */
app.get('/posts/:id/comments', async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const take = 20;
  const items = await prisma.comment.findMany({
    where: { postId: req.params.id, status: 'ACTIVE', parentId: null },
    skip: (page - 1) * take,
    take,
    include: {
      author: { select: { id: true, name: true, username: true, image: true } },
      replies: {
        where: { status: 'ACTIVE' },
        include: { author: { select: { id: true, name: true, username: true, image: true } } },
        take: 5,
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'asc' },
  });
  return ok(res, items);
});

/** POST /posts/:id/comments */
app.post('/posts/:id/comments', requireAuth, async (req: AuthRequest, res) => {
  const schema = z.object({
    content:  z.string().min(1).max(1000),
    parentId: z.string().optional(),
  });
  const v = validate(schema, req.body);
  if ('error' in v) return fail(res, v.error);

  const comment = await prisma.comment.create({
    data: { ...v.data, postId: req.params.id, authorId: req.user!.id },
    include: { author: { select: { id: true, name: true, username: true, image: true } } },
  });

  await prisma.post.update({
    where: { id: req.params.id },
    data: { commentsCount: { increment: 1 } },
  });
  await track({ type: 'comment_created', userId: req.user!.id, targetId: comment.id });
  return ok(res, comment, 201);
});

/** DELETE /comments/:id */
app.delete('/comments/:id', requireAuth, async (req: AuthRequest, res) => {
  const comment = await prisma.comment.findUnique({ where: { id: req.params.id } });
  if (!comment) return fail(res, 'Comment not found', 404);
  if (comment.authorId !== req.user!.id && !['MODERATOR', 'ADMIN', 'SUPER_ADMIN'].includes(req.user!.role)) {
    return fail(res, 'Forbidden', 403);
  }
  await prisma.comment.update({ where: { id: req.params.id }, data: { status: 'DELETED' } });
  await prisma.post.update({ where: { id: comment.postId }, data: { commentsCount: { decrement: 1 } } });
  return ok(res, { deleted: true });
});

// ============================================================
// MODERATION / REPORTS
// ============================================================

/** POST /reports */
app.post('/reports', requireAuth, async (req: AuthRequest, res) => {
  const schema = z.object({
    targetType:  z.enum(['POST', 'COMMENT', 'USER']),
    targetId:    z.string(),
    reason:      z.enum(['SPAM', 'HATE', 'NSFW', 'ILLEGAL', 'HARASSMENT', 'IMPERSONATION', 'OTHER']),
    description: z.string().max(500).optional(),
  });
  const v = validate(schema, req.body);
  if ('error' in v) return fail(res, v.error);

  const report = await prisma.report.create({
    data: { ...v.data, reporterId: req.user!.id },
  });

  await track({ type: 'report_submitted', userId: req.user!.id, targetId: v.data.targetId });
  return ok(res, report, 201);
});

/** GET /admin/reports — moderator only */
app.get('/admin/reports', requireAuth, requireRole('MODERATOR', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res) => {
  const status = (req.query.status as string) ?? 'PENDING';
  const page = Number(req.query.page ?? 1);
  const take = 20;
  const where = { status };
  const [total, items] = await Promise.all([
    prisma.report.count({ where }),
    prisma.report.findMany({ where, skip: (page - 1) * take, take, orderBy: { createdAt: 'desc' }, include: { reporter: { select: { id: true, name: true, username: true } } } }),
  ]);
  return ok(res, { items, total });
});

/** POST /admin/reports/:id/action */
app.post('/admin/reports/:id/action', requireAuth, requireRole('MODERATOR', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res) => {
  const schema = z.object({
    action:     z.enum(['APPROVE', 'HIDE', 'DELETE', 'BAN_7D', 'BAN_30D', 'BAN_PERMANENT', 'WARN', 'ESCALATE']),
    reason:     z.string().min(1).max(500),
    legalBasis: z.string().optional(),
    targetType: z.string(),
    targetId:   z.string(),
  });
  const v = validate(schema, req.body);
  if ('error' in v) return fail(res, v.error);

  const report = await prisma.report.findUnique({ where: { id: req.params.id } });
  if (!report) return fail(res, 'Report not found', 404);

  const action = await prisma.moderationAction.create({
    data: { reportId: req.params.id, moderatorId: req.user!.id, ...v.data },
  });

  await prisma.report.update({ where: { id: req.params.id }, data: { status: 'RESOLVED' } });
  await track({ type: 'moderation_action', userId: req.user!.id, targetId: v.data.targetId });
  return ok(res, action, 201);
});

// ============================================================
// NOTIFICATIONS
// ============================================================

/** GET /notifications */
app.get('/notifications', requireAuth, async (req: AuthRequest, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return ok(res, notifications);
});

/** PATCH /notifications/:id/read */
app.patch('/notifications/:id/read', requireAuth, async (req: AuthRequest, res) => {
  const n = await prisma.notification.findUnique({ where: { id: req.params.id } });
  if (!n || n.userId !== req.user!.id) return fail(res, 'Not found', 404);
  await prisma.notification.update({ where: { id: req.params.id }, data: { read: true } });
  return ok(res, { read: true });
});

/** POST /notifications/read-all */
app.post('/notifications/read-all', requireAuth, async (req: AuthRequest, res) => {
  await prisma.notification.updateMany({ where: { userId: req.user!.id, read: false }, data: { read: true } });
  return ok(res, { done: true });
});

// ============================================================
// AI GENERATION
// ============================================================

/** GET /ai/credits */
app.get('/ai/credits', requireAuth, async (req: AuthRequest, res) => {
  const balance = await getCredits(req.user!.id);
  return ok(res, { balance });
});

/** POST /ai/generate */
app.post('/ai/generate', requireAuth, async (req: AuthRequest, res) => {
  const schema = z.object({
    type:    z.enum(['bio', 'caption', 'hashtags', 'promo', 'ideas']),
    payload: z.record(z.union([z.string(), z.array(z.string())])),
  });
  const v = validate(schema, req.body);
  if ('error' in v) return fail(res, v.error);

  if (!process.env.GEMINI_API_KEY) {
    return fail(res, 'AI service not configured', 503);
  }

  try {
    const result = await runAIGeneration(req.user!.id, v.data);
    await track({ type: 'ai_generation', userId: req.user!.id, metadata: { type: v.data.type } });
    return ok(res, result, 201);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === 'INSUFFICIENT_CREDITS') return fail(res, 'Insufficient credits', 402);
    return fail(res, 'AI generation failed: ' + msg, 500);
  }
});

/** GET /ai/history */
app.get('/ai/history', requireAuth, async (req: AuthRequest, res) => {
  const page = Number(req.query.page ?? 1);
  const take = 20;
  const items = await prisma.aIGeneration.findMany({
    where: { userId: req.user!.id },
    skip: (page - 1) * take,
    take,
    orderBy: { createdAt: 'desc' },
  });
  return ok(res, items);
});

// ============================================================
// PAYMENTS / SUBSCRIPTIONS
// ============================================================

/** GET /billing/plans */
app.get('/billing/plans', (_req, res) => {
  const { subscriptionPlans } = require('@meta-geniusz/config');
  return ok(res, subscriptionPlans);
});

/** POST /billing/checkout */
app.post('/billing/checkout', requireAuth, async (req: AuthRequest, res) => {
  const schema = z.object({
    plan:       z.string(),
    successUrl: z.string().url().optional(),
    cancelUrl:  z.string().url().optional(),
  });
  const v = validate(schema, req.body);
  if ('error' in v) return fail(res, v.error);

  const session = await payments.createCheckout({
    userId:     req.user!.id,
    plan:       v.data.plan,
    successUrl: v.data.successUrl ?? `${process.env.FRONTEND_URL}/billing/success`,
    cancelUrl:  v.data.cancelUrl  ?? `${process.env.FRONTEND_URL}/billing/cancel`,
  });

  return ok(res, session, 201);
});

/** POST /billing/tip */
app.post('/billing/tip', requireAuth, async (req: AuthRequest, res) => {
  const schema = z.object({
    toUserId: z.string(),
    amount:   z.number().positive().max(1000),
    note:     z.string().max(200).optional(),
  });
  const v = validate(schema, req.body);
  if ('error' in v) return fail(res, v.error);
  if (v.data.toUserId === req.user!.id) return fail(res, 'Cannot tip yourself');

  const result = await payments.createTip({
    fromUserId: req.user!.id,
    toUserId:   v.data.toUserId,
    amount:     v.data.amount,
    note:       v.data.note,
  });

  await track({ type: 'tip_sent', userId: req.user!.id, targetId: v.data.toUserId, metadata: { amount: v.data.amount } });
  return ok(res, result, 201);
});

// ============================================================
// PORTFOLIO (RFG)
// ============================================================

/** GET /portfolios */
app.get('/portfolios', async (req, res) => {
  const page     = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 20);
  const skip     = (page - 1) * pageSize;

  const [total, items] = await Promise.all([
    prisma.portfolio.count({ where: { visibility: 'PUBLIC', status: 'ACTIVE' } }),
    prisma.portfolio.findMany({
      where: { visibility: 'PUBLIC', status: 'ACTIVE' },
      skip, take: pageSize,
      include: {
        user: { select: { id: true, name: true, username: true, image: true } },
        images: { orderBy: { order: 'asc' }, take: 3 },
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return ok(res, { items, total, page, pageSize, hasMore: skip + items.length < total });
});

/** GET /portfolios/:id */
app.get('/portfolios/:id', async (req, res) => {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: req.params.id },
    include: {
      user: { select: { id: true, name: true, username: true, image: true } },
      images: { orderBy: { order: 'asc' } },
    },
  });
  if (!portfolio || portfolio.status !== 'ACTIVE') return fail(res, 'Portfolio not found', 404);
  if (portfolio.visibility === 'PRIVATE') return fail(res, 'This portfolio is private', 403);
  return ok(res, portfolio);
});

/** POST /portfolios */
app.post('/portfolios', requireAuth, async (req: AuthRequest, res) => {
  const schema = z.object({
    title:       z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    category:    z.enum(['MODEL', 'PHOTOGRAPHER', 'INFLUENCER', 'FITNESS']).default('MODEL'),
    visibility:  z.enum(['PUBLIC', 'VERIFIED_ONLY', 'PRIVATE']).default('PUBLIC'),
  });
  const v = validate(schema, req.body);
  if ('error' in v) return fail(res, v.error);

  const portfolio = await prisma.portfolio.create({
    data: { ...v.data, userId: req.user!.id },
  });
  return ok(res, portfolio, 201);
});

/** POST /portfolios/:id/images */
app.post('/portfolios/:id/images', requireAuth, upload.array('images', 10), async (req: AuthRequest, res) => {
  const portfolio = await prisma.portfolio.findUnique({ where: { id: req.params.id } });
  if (!portfolio) return fail(res, 'Portfolio not found', 404);
  if (portfolio.userId !== req.user!.id) return fail(res, 'Forbidden', 403);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const files = req.files as any[] | undefined;
  if (!files || files.length === 0) return fail(res, 'No files uploaded');

  const lastImage = await prisma.portfolioImage.findFirst({
    where: { portfolioId: req.params.id },
    orderBy: { order: 'desc' },
  });
  const startOrder = (lastImage?.order ?? -1) + 1;

  const images = await prisma.$transaction(
    files.map((file, i) =>
      prisma.portfolioImage.create({
        data: {
          portfolioId: req.params.id,
          imageUrl: getFileUrl(file.filename),
          order: startOrder + i,
        },
      }),
    ),
  );
  return ok(res, images, 201);
});

/** DELETE /portfolios/:id */
app.delete('/portfolios/:id', requireAuth, async (req: AuthRequest, res) => {
  const portfolio = await prisma.portfolio.findUnique({ where: { id: req.params.id } });
  if (!portfolio) return fail(res, 'Portfolio not found', 404);
  if (portfolio.userId !== req.user!.id) return fail(res, 'Forbidden', 403);
  await prisma.portfolio.update({ where: { id: req.params.id }, data: { status: 'DELETED' } });
  return ok(res, { deleted: true });
});

// ============================================================
// ADMIN
// ============================================================

/** GET /admin/stats */
app.get('/admin/stats', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), async (_req, res) => {
  const stats = await getGlobalStats();
  return ok(res, stats);
});

/** GET /admin/users */
app.get('/admin/users', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res) => {
  const page = Number(req.query.page ?? 1);
  const take = 20;
  const q    = (req.query.q as string) ?? '';
  const where = q
    ? { OR: [{ email: { contains: q } }, { username: { contains: q } }] }
    : {};
  const [total, items] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where, skip: (page - 1) * take, take,
      select: { id: true, email: true, name: true, username: true, role: true, status: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    }),
  ]);
  return ok(res, { items, total });
});

/** PATCH /admin/users/:id */
app.patch('/admin/users/:id', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res) => {
  const schema = z.object({
    role:   z.enum(['USER', 'MODERATOR', 'ADMIN']).optional(),
    status: z.enum(['ACTIVE', 'SUSPENDED', 'BANNED']).optional(),
  });
  const v = validate(schema, req.body);
  if ('error' in v) return fail(res, v.error);

  const updated = await prisma.user.update({
    where: { id: req.params.id },
    data: v.data,
    select: { id: true, email: true, role: true, status: true },
  });

  await prisma.auditLog.create({
    data: {
      actorId: req.user!.id, actorRole: req.user!.role,
      action: 'ADMIN_USER_UPDATE', targetType: 'USER', targetId: req.params.id,
      metadata: v.data as Record<string, string>,
    },
  });
  return ok(res, updated);
});

/** GET /admin/audit-log */
app.get('/admin/audit-log', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res) => {
  const page = Number(req.query.page ?? 1);
  const take = 50;
  const items = await prisma.auditLog.findMany({
    skip: (page - 1) * take, take,
    orderBy: { createdAt: 'desc' },
  });
  return ok(res, items);
});

// ============================================================
// SEARCH
// ============================================================

/** GET /search */
app.get('/search', async (req, res) => {
  const q    = (req.query.q as string) ?? '';
  const type = (req.query.type as string) ?? 'all';
  if (q.length < 2) return fail(res, 'Query too short');

  const results: Record<string, unknown> = {};

  if (type === 'all' || type === 'users') {
    results.users = await prisma.user.findMany({
      where: {
        status: 'ACTIVE',
        OR: [{ username: { contains: q, mode: 'insensitive' } }, { name: { contains: q, mode: 'insensitive' } }],
      },
      select: { id: true, name: true, username: true, image: true, bio: true },
      take: 10,
    });
  }

  if (type === 'all' || type === 'posts') {
    results.posts = await prisma.post.findMany({
      where: { status: 'ACTIVE', content: { contains: q, mode: 'insensitive' } },
      include: { author: { select: { id: true, name: true, username: true, image: true } } },
      take: 10,
      orderBy: { createdAt: 'desc' },
    });
  }

  return ok(res, results);
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[API Error]', err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// 404
app.use((_req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

// ============================================================
// START
// ============================================================

app.listen(PORT, () => {
  console.log(`[META-GENIUSZ OS] API running on port ${PORT}`);
});

export default app;
