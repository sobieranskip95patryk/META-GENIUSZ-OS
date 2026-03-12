// ============================================================
// ENUMS
// ============================================================

export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'BANNED' | 'SOFT_DELETED';
export type VerticalType = 'HHU' | 'RFG' | 'AI_STUDIO';
export type PostType = 'TEXT' | 'IMAGE' | 'AUDIO' | 'VIDEO' | 'LINK';
export type ContentStatus = 'ACTIVE' | 'HIDDEN' | 'DELETED';
export type ReportReason = 'SPAM' | 'HATE' | 'NSFW' | 'ILLEGAL' | 'HARASSMENT' | 'IMPERSONATION' | 'OTHER';
export type ReportStatus = 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';
export type ModerationActionType = 'APPROVE' | 'HIDE' | 'DELETE' | 'BAN_7D' | 'BAN_30D' | 'BAN_PERMANENT' | 'WARN' | 'ESCALATE';
export type AIGenType = 'bio' | 'caption' | 'hashtags' | 'promo' | 'ideas' | 'cover' | 'workflow';
export type SubscriptionPlan = 'FREE' | 'HHU_PRO' | 'AI_STARTER' | 'AI_PRO' | 'AI_UNLIMITED' | 'RFG_PRO';
export type TransactionType = 'TIP' | 'SUBSCRIPTION' | 'AI_CREDIT' | 'PAYOUT' | 'REFUND';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type NotificationType = 'LIKE' | 'COMMENT' | 'FOLLOW' | 'TIP' | 'SYSTEM' | 'CHALLENGE_WON';
export type PortfolioVisibility = 'PUBLIC' | 'VERIFIED_ONLY' | 'PRIVATE';

// ============================================================
// USER & AUTH
// ============================================================

export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  username?: string;
  bio?: string;
  role: UserRole;
  status: UserStatus;
  phoneVerified: boolean;
  identityVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicUser {
  id: string;
  name?: string;
  username?: string;
  image?: string;
  bio?: string;
  role: UserRole;
  followersCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
  createdAt: Date;
}

// ============================================================
// POSTS & SOCIAL
// ============================================================

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  author?: PublicUser;
  vertical: VerticalType;
  type: PostType;
  status: ContentStatus;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author?: PublicUser;
  postId: string;
  parentId?: string;
  replies?: Comment[];
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

// ============================================================
// MODERATION
// ============================================================

export interface Report {
  id: string;
  reporterId: string;
  targetType: 'POST' | 'COMMENT' | 'USER';
  targetId: string;
  reason: ReportReason;
  description?: string;
  status: ReportStatus;
  priority: 'P0' | 'P1' | 'P2';
  createdAt: Date;
  resolvedAt?: Date;
}

export interface ModerationAction {
  id: string;
  reportId?: string;
  moderatorId: string;
  action: ModerationActionType;
  reason: string;
  legalBasis?: string;
  targetType: string;
  targetId: string;
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  actorId?: string;
  actorRole: string;
  action: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  result: 'SUCCESS' | 'FAILURE';
}

// ============================================================
// AI
// ============================================================

export interface AIGeneration {
  id: string;
  userId: string;
  type: AIGenType;
  input: Record<string, unknown>;
  output: string;
  model: string;
  creditsUsed: number;
  saved: boolean;
  createdAt: Date;
}

export interface CreditBalance {
  userId: string;
  balance: number;
  lifetimeEarned: number;
  lastRefreshed: Date;
}

export interface AIGenerateRequest {
  type: AIGenType;
  payload: Record<string, string | string[]>;
}

// ============================================================
// MONETIZATION
// ============================================================

export interface Subscription {
  id: string;
  subscriberId: string;
  plan: SubscriptionPlan;
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  startedAt: Date;
  endsAt?: Date;
}

export interface Transaction {
  id: string;
  fromUserId?: string;
  toUserId: string;
  amount: number;
  currency: string;
  type: TransactionType;
  status: TransactionStatus;
  note?: string;
  createdAt: Date;
}

// ============================================================
// NOTIFICATIONS
// ============================================================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body?: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: Date;
}

// ============================================================
// RFG PORTFOLIO
// ============================================================

export interface Portfolio {
  id: string;
  userId: string;
  user?: PublicUser;
  title: string;
  description?: string;
  category: string;
  visibility: PortfolioVisibility;
  status: ContentStatus;
  images?: PortfolioImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioImage {
  id: string;
  portfolioId: string;
  imageUrl: string;
  caption?: string;
  order: number;
  createdAt: Date;
}

// ============================================================
// API RESPONSE
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface PaginationQuery {
  page?: number;
  pageSize?: number;
  cursor?: string;
}

// ============================================================
// AUTH types (legacy JWT + new session shape)
// ============================================================

export interface AuthToken {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  username?: string;
  role: UserRole;
  image?: string;
}

// ============================================================
// ERROR
// ============================================================

export interface ErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type AppError =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'INSUFFICIENT_CREDITS'
  | 'ALREADY_EXISTS'
  | 'INTERNAL_ERROR';

// ============================================================
// UPLOAD
// ============================================================

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
}
