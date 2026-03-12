import { prisma } from '@meta-geniusz/database';

// ============================================================
// EVENT TYPES
// ============================================================

export type AnalyticsEventType =
  | 'page_view'
  | 'sign_up'
  | 'login'
  | 'post_created'
  | 'post_liked'
  | 'post_unliked'
  | 'comment_created'
  | 'user_followed'
  | 'user_unfollowed'
  | 'ai_generation'
  | 'tip_sent'
  | 'subscription_started'
  | 'portfolio_viewed'
  | 'report_submitted'
  | 'moderation_action';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  userId?: string;
  targetId?: string;
  targetType?: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
}

// ============================================================
// TRACK EVENT
// ============================================================

export async function track(event: AnalyticsEvent): Promise<void> {
  try {
    // Write to audit log for compliance + analytics
    await prisma.auditLog.create({
      data: {
        action: event.type,
        actorId: event.userId,
        actorRole: event.userId ? 'USER' : 'ANONYMOUS',
        targetType: event.targetType,
        targetId: event.targetId,
        metadata: event.metadata as Record<string, string>,
        ip: event.ip,
        userAgent: event.userAgent,
        result: 'SUCCESS',
      },
    });
  } catch {
    // Analytics should never crash the main flow
  }
}

// ============================================================
// AGGREGATE STATS
// ============================================================

export async function getUserStats(userId: string) {
  const [posts, followers, following, likes] = await Promise.all([
    prisma.post.count({ where: { authorId: userId, status: 'ACTIVE' } }),
    prisma.follow.count({ where: { followingId: userId } }),
    prisma.follow.count({ where: { followerId: userId } }),
    prisma.like.count({ where: { post: { authorId: userId } } }),
  ]);

  return { posts, followers, following, likes };
}

export async function getGlobalStats() {
  const [users, posts, reports, aiGenerations] = await Promise.all([
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.post.count({ where: { status: 'ACTIVE' } }),
    prisma.report.count({ where: { status: 'PENDING' } }),
    prisma.aIGeneration.count(),
  ]);

  return { users, posts, pendingReports: reports, aiGenerations };
}
